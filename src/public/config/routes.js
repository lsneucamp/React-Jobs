import React from 'react'
import Main from '../app/components/main'
import JobSearchLayout from '../app/components/jobs/job-search.layout'
// import JobSearchLayout from '../app/layouts/JobSearchLayout'
import SearchForm from '../app/components/commons/forms/search-form'
import NotFound from '../app/components/commons/not-found.layout'
import {Route,IndexRoute} from 'react-router'


import GoogleAnalytics from './google-analytics';

const GA = new GoogleAnalytics(GA_TRACKING_CODE);


const onRouteChange = (prevState, nextState, replace, callback)=>{
    console.log("prevState",prevState)
    console.log("nextState",nextState)
    console.log("replace",replace)
    console.log("callback",callback)
    GA.send(nextState.location)
    callback()
}

export default (
    <Route path="/" component={Main}

           onChange={onRouteChange.bind(this)}>
        <IndexRoute component={JobSearchLayout}/>
        <Route path="/search" component={JobSearchLayout}/>
        <Route path="/form" component={SearchForm}/>
        <Route path="*" component={JobSearchLayout}/>
    </Route>
)