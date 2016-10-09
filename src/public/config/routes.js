import React from 'react'
import Main from '../app/components/main'
import JobSearchLayout from '../app/components/Jobs/job-search.layout'
import SearchForm from '../app/components/commons/forms/search-form'
import NotFound from '../app/components/NotFound'
import {Route,IndexRoute} from 'react-router'


export default (
    <Route path="/" component={Main}>
        <IndexRoute component={JobSearchLayout}/>
        <Route path="/search" component={JobSearchLayout}/>
        <Route path="/form" component={SearchForm}/>
        <Route path="*" component={NotFound}/>
    </Route>
)