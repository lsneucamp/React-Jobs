const express = require('express')
const path = require('path')
const bodyParser =  require('body-parser')
const morgan =  require('morgan')
const logger =  require('winston')
const compression = require('compression');
const PORT = process.env.PORT || 8000


const publicDir = '/../../../public'

module.exports =  function (callback) {

    const app = express()

    // set middleware
    app.use(morgan('common'))
    app.use(compression())
    app.use(bodyParser.urlencoded({extend:true}))
    app.use(bodyParser.json('*/*'))

    logger.info('Server routes initializing...')
    // routes
    require('../../app/routes/index')(app);

    logger.info('Server routes initialized!')


    // server static assets normally
    app.use(express.static(__dirname + publicDir))

    // server default
    app.get('*', function (request, response) {
        response.sendFile(path.resolve(__dirname+publicDir+'/index.html'))
    })

    // error handlers
    app.use(function (err, req, res, next) {
        logger.error(err)
        res.status(err.status || 500)
        res.json({
            message: err.message||'Internal Server Error',
            error: err
        });
    });

    app.listen(PORT)
    logger.info(`Server initialized in the port ${PORT}`)

    callback(null,app)
}
