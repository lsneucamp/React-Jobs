import React from 'react'
import Main from '../app/components/Main'
import JobSearchLayout from '../app/layouts/JobSearchLayout'
import NotFound from '../app/components/NotFound'
import {Route,IndexRoute} from 'react-router'


export default (
    <Route path="/" component={Main}>
        <IndexRoute component={JobSearchLayout}/>
        <Route path="/search" component={JobSearchLayout}/>
        <Route path="*" component={NotFound}/>
    </Route>
)