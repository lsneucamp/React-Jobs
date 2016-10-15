
export default class GA {

    constructor(trackingCode){
        window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date
        ga('create', trackingCode, 'auto')
    }

    send(location){
        ga('send', {
            hitType: 'pageview',
            page: location.pathname,
            location: window.location.origin + location.pathname + location.search,
            title: document.title
        })
    }
}





