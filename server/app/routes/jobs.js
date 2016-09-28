module.exports = function (router) {
    router.route('/')
        .get(function (req, res, next) {

            const client = req.app.get('elasticsearch')

            const query = req.query.q || ""

            client.search({
                index: 'jobs',
                type: 'job',
                from: 0,
                size: 50,
                body: {
                    min_score: 0.5,
                    query: {
                        query_string: {
                            fields: ["title^4", "location", "companyName", "description"],
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

                // extract source object from elasticsearch response hits
                const results = response.hits.hits.map(function (hit) {
                    let source =  hit._source
                    source.id = hit._id
                    return source
                })

                let aggs =  []
                aggs.push({name:'Jobs',buckets:response.aggregations['group_by_title'].buckets})
                aggs.push({name:'Locations',buckets:response.aggregations['group_by_location'].buckets})
                aggs.push({name:'Companies',buckets:response.aggregations['group_by_company'].buckets})


                let result =  {
                    took:response.took,
                    count:response.hits.total,
                    results,
                    aggs
                }

                res.json(result)

            }, function (err) {
                return next(err)
            })
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