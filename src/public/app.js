import css from './style/app.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import routes from './config/routes';

ReactDOM.render(
    <Router history={browserHistory}>
        {routes}
    </Router>,
    document.getElementById('app')
);

