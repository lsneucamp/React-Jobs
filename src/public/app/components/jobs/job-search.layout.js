import React from 'react'
import Immutable from 'immutable'
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
        let query = this.buildQuery(props)
        // set default query term
        query.q = 'software developer'
        this.state = {
            isLoading: false,
            query
        }
    }

    componentWillMount() {
        JobStore.addChangeListener(this.refreshResults.bind(this))
    }

    componentDidMount() {
        this.search()
    }

    componentWillReceiveProps(nextProps) {
        let newState = Immutable.Map(this.state).toObject()
        const query = this.buildQuery(nextProps)
        newState.isLoading = true
        newState.query = query
        // update this state query and set is loading to true
        this.setState(newState)
        // call search job action!!
        JobActions.searchJob(query)
    }

    componentWillUnmount() {
        JobStore.removeChangeListener(this.refreshResults.bind(this))
    }

    buildQuery(newProps) {
        const props = newProps || this.props
        const {query} = props.location
        let filters = {}
        for (var key in query) {
            if (query.hasOwnProperty(key) && key.startsWith('f_')) {
                if (Array.isArray(query[key])) {
                    filters[key] = query[key]
                } else {
                    filters[key] = [query[key]]
                }
            } else if (query.hasOwnProperty(key)){
                filters[key] = query[key]
            }
        }
        return filters
    }

    refreshResults() {
        let newState = Immutable.Map(this.state).toObject()
        newState.results = JobStore.getResults()
        newState.isLoading = false

        this.setState(newState)
    }

    onAddFilter(type, newFilters) {
        let query = Immutable.Map(this.state.query).toObject()
        query[type] = newFilters
        // make context router push new props in this component
        this.context.router.push({pathname: '/search', query})
    }

    onSubmit(q) {
        let query = Immutable.Map(this.state.query).toObject()
        query.q = q
        // make context router push new props in this component
        this.context.router.push({pathname: '/search', query})
    }

    search() {
        let query = this.buildQuery()
        const isLoading = true;
        // change context path and query
        // console.log("update query",query)
        // this.context.router.replace({pathname: '/search', query: query})
        console.log('query',query)

        const newState =  {isLoading,query}
        // update this state query and set is loading to true
        this.setState(newState)
        // call search job action!!
        JobActions.searchJob(query)
    }

    render() {
        const searchFormPlaceholder = "Type a term and press enter to search a job (e.g. software) "

        // render results
        let results = this.state.isLoading?<div></div>:<JobResultsEmpty q={this.state.query.q}/>
        if (!!this.state.results && this.state.results.count > 0)
            results = <JobResults filters={this.state.query} onAddFilter={this.onAddFilter.bind(this)}
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
                                inputValue={this.state.query.q}/>
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
