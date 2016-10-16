import React from 'react'
import SearchForm from '../commons/forms/search-form'
import PortalLogo from '../commons/portal-logo.component'
import FixedImagePanel from '../commons/fixed-image-panel.component'
import JobStore from './job.store'
import JobActions from './job.actions'
import JobResults from './job-results.component'
import JobResultsEmpty from './job-results-empty.component'


export default class JobSearchLayout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            results: {},
            q: '',
            filters: {}
        }
    }

    componentWillMount() {
        // retrieve query parameter OR
        // if q is empty set a default test for demo
        const q = this.props.location.query.q || 'software developer'
        // get filters
        const filters = this.mapFilters(this.props.location.query)

        this.state.q = q;
        this.state.filters = filters;
        // set state
        this.setState(this.state)

        JobStore.addChangeListener(this.refreshResults.bind(this))
        // search a job on mount
        this.search()
    }

    componentWillUpdate(){
        console.log("componentWillUpdate", this.state)
    }

    mapFilters(query) {
        let filters = {}
        for (var key in query) {
            if (query.hasOwnProperty(key) && key.startsWith('f_')) {
                if(Array.isArray(query[key])){
                    filters[key] = query[key]
                } else {
                    filters[key] = [query[key]]
                }
            }
        }
        return filters
    }

    buildQuery() {
        let query =  this.state.filters
        query.q = this.state.q
        return query
    }

    componentWillUnmount() {
        JobStore.removeChangeListener(this.refreshResults.bind(this))
    }

    refreshResults() {
        this.state.results = JobStore.getResults()
        this.state.isLoading = false;
        this.setState(this.state)
    }

    onAddFilter(type, newFilters) {
        console.log("onAddFilter", type, newFilters)
        this.state.filters[type] = newFilters
        this.setState(this.state)
        this.search()
    }

    onSubmit(q) {
        // reset filters
        const filters = {}

        // update q state
        this.setState({q, filters})
        this.search()
    }

    search() {
        this.state.isLoading = true;
        this.setState(this.state)

        const query = this.buildQuery()
        console.log("query", query)
        // change context path and query
        this.context.router.push({pathname: '/search', query: query})
        // search a job
        JobActions.searchJob(query)
    }

    render() {
        const searchFormPlaceholder = "Type a term and press enter to search a job (e.g. software) "

        // render results
        let results = <JobResultsEmpty q={this.state.q}/>
        if (!!this.state.results && this.state.results.count > 0)
            results = <JobResults filters={this.state.filters} onAddFilter={this.onAddFilter.bind(this)}
                                  results={this.state.results}/>


        return (
            <div>
                <FixedImagePanel>
                    <PortalLogo/>
                    <div className="row">
                        <div className="col-sm-offset-2 col-sm-8 ">
                            <p className="lead text-center color-inverse">
                                Your first job source demonstration portal!
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-10 col-md-8 col-lg-6">
                            <SearchForm
                                isLoading={this.state.isLoading}
                                placeholder={searchFormPlaceholder}
                                onSubmit={this.onSubmit.bind(this)}
                                inputValue={this.state.q}/>
                        </div>
                    </div>
                </FixedImagePanel>
                <div className="container">
                    {results}
                </div>
            </div>


        )
    }
}
JobSearchLayout.contextTypes = {
    router: React.PropTypes.object
};
