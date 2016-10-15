// import once styles
import css from './app/utils/styles/_font-awesome.scss'

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import routes from './config/routes';
import GoogleAnalytics from './config/google-analytics';

const GA = new GoogleAnalytics(GA_TRACKING_CODE);

browserHistory.listen( location =>  {
    GA.send(location)
});


ReactDOM.render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('app')
);

