module.exports = function(router) {
    router.route('/')
        .get(function(req, res, next) {
            res.send('OK')
        })

}