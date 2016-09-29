const async = require('async')

module.exports = function (router) {
    router.route('/')
        .get(function (req, res, next) {

            const esClient = req.app.get('elasticsearch')

            const query = req.query.q || ""
            const page = req.query.page || 0
            const size = 10

            // filters
            // jobs
            const jo = req.query.jo
            //  companies
            const co = req.query.co
            // locations
            const lo = req.query.lo


            async.parallel(
                {
                    pageResult: function (cb) {
                        jobSearch(query, page, size, {jo, co, lo}, esClient, cb)
                    },
                    searchAggregation: function (cb) {
                        jobAggregationSearch(query, esClient, cb)
                    }
                },
                function (err, results) {
                    if (err)
                        return next(err)

                    results.pageResult.aggs = results.searchAggregation

                    res.json(results.pageResult)

                }
            )


        })
    router.route("/:id")
        .get(function (req, res, next) {
            const client = req.app.get('elasticsearch')


            client.get({
                index: 'jobs',
                type: 'job',
                id: req.params.id
            }).then(function (response) {

                // extract source object from elasticsearch response hits
                // const mapSource = response.hits.hits.map(function (hit) {
                //     return hit
                // })

                res.json(response)

            }, function (err) {
                return next(err)
            })
        })
}

const fieldBoostConfig = ["title^4", "location", "companyName", "description"];

const jobSearch = function (query, page, size, filters, esClient, callback) {
    let and = [];

    // add job filter
    const jobFilter = buildFilter('title.raw', filters.jo)
    if (!!jobFilter) and.push(jobFilter)
    // add company filter
    const companyFilter = buildFilter('companyName.raw', filters.co)
    if (!!companyFilter) and.push(companyFilter)
    // add company filter
    const locationFilter = buildFilter('location.raw', filters.lo)
    if (!!locationFilter) and.push(locationFilter)


    let filter = {}
    if (and.length > 0) {
        filter.and = and
    }

    const body = {
        min_score: 0.5,
        query: {
            filtered: {
                query: {
                    query_string: {
                        fields: fieldBoostConfig,
                        query: query
                    }
                },
                filter
            }
        }
    }

    console.log(body)

    esClient.search({
        index: 'jobs',
        type: 'job',
        from: page * size,
        size,
        body

    }).then(function (response) {

        // extract source object from elasticsearch response hits
        const results = response.hits.hits.map(function (hit) {
            let source = hit._source
            source.id = hit._id
            return source
        })

        let result = {
            took: response.took,
            count: response.hits.total,
            pages: Math.ceil(response.hits.total / size),
            page,
            size,
            results
        }

        callback(null, result)

    }, function (err) {
        callback(err, null)
    })
}

const jobAggregationSearch = function (query, esClient, callback) {
    esClient.search({
        index: 'jobs',
        type: 'job',
        size: 0,
        body: {
            min_score: 0.5,
            query: {
                query_string: {
                    fields: fieldBoostConfig,
                    query: query
                }
            },
            aggs: {
                group_by_company: {
                    terms: {
                        field: "companyName.raw",
                        size: 5
                    }
                },
                group_by_location: {
                    terms: {
                        field: "location.raw",
                        size: 5
                    }
                },
                group_by_title: {
                    terms: {
                        field: "title.raw",
                        size: 5
                    }
                }
            }
        }
    }).then(function (response) {
        let aggs = []

        aggs.push({name: 'Jobs', buckets: response.aggregations['group_by_title'].buckets})
        aggs.push({name: 'Locations', buckets: response.aggregations['group_by_location'].buckets})
        aggs.push({name: 'Companies', buckets: response.aggregations['group_by_company'].buckets})

        callback(null, aggs)

    }, function (err) {
        callback(err, null)
    })
}

const buildFilter = function (field, filter) {

    if (!!filter && Array.isArray(filter)) {
        const or = filter.map(function (value) {
            let term = {}
            term[field] = value
            return {term}
        })
        return {or}
    } else if (!!filter && !Array.isArray(filter)) {
        let term = {}
        term[field] = filter

        return {term}
    }

    return null
}