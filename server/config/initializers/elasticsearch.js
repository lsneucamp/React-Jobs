const logger =  require('winston')
const elasticsearch = require('elasticsearch');
const host = process.env.ES_HOST || 'localhost:9200'

module.exports =  function (app,callback) {
    logger.info("Elasticsearch initializing...")

    const client = new elasticsearch.Client({
        host: host,
        log: 'trace'
    });
    app.set('elasticsearch',client)
    logger.info("Elasticsearch initialized!")
    callback()
}