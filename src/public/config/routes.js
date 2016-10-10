import React from 'react'
import Main from '../app/components/main'
import JobSearchLayout from '../app/components/jobs/job-search.layout'
// import JobSearchLayout from '../app/layouts/JobSearchLayout'
import SearchForm from '../app/components/commons/forms/search-form'
import NotFound from '../app/components/commons/not-found.layout'
import {Route,IndexRoute} from 'react-router'


export default (
    <Route path="/" component={Main}>
        <IndexRoute component={JobSearchLayout}/>
        <Route path="/search" component={JobSearchLayout}/>
        <Route path="/form" component={SearchForm}/>
        <Route path="*" component={JobSearchLayout}/>
    </Route>
)