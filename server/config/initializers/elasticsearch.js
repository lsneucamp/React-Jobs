const logger =  require('winston')
const elasticsearch = require('elasticsearch');


module.exports =  function (app,callback) {
    logger.info("Elasticsearch initializing...")

    const client = new elasticsearch.Client({
        host: 'localhost:9200',
        log: 'trace'
    });
    app.set('elasticsearch',client)
    logger.info("Elasticsearch initialized!")
    callback()
}