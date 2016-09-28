const async = require('async')
const logger = require('winston')
const server = require('./config/initializers/server')
const elasticsearch = require('./config/initializers/elasticsearch')

logger.info('Preparing to start the application!');

async.waterfall([
        // initialize express server FIRST!
        function initServer(callback) {
            server(callback)
        },
        // initialize elasticsearch client
        function initElasticsearch(app, callback) {
            elasticsearch(app,callback)
        }
    ], function (err) {
        if (err) {
            logger.error('Application FAILED to start!', err)
        } else {
            logger.info('Application started SUCCESSFULLY!')
        }
    }
);