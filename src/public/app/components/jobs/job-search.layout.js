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
            q: ''
        }
    }

    componentWillMount() {
        // retrieve query parameter OR
        // if q is empty set a default test for demo
        const q = this.props.location.query.q || 'software developer'
        this.setState({q})

        JobStore.addChangeListener(this.refreshResults.bind(this))
        // search a job on mount
        JobActions.searchJob(q)
    }

    componentWillUnmount() {
        JobStore.removeChangeListener(this.refreshResults.bind(this))
    }

    refreshResults() {
        const results = JobStore.getResults()
        console.debug("JobSearchLayout.refreshResults", results)
        this.setState({results, isLoading: false})
    }

    onSubmit(q) {
        // update q state
        this.setState({q})
        // update state to loading
        this.setState({isLoading: true})
        // change context path and query
        this.context.router.push({pathname: '/search', query: {q}})
        // search a job
        JobActions.searchJob(q)
    }

    render() {
        const searchFormPlaceholder = "Type a term and press enter to search a job (e.g. software) "

        // render results
        let results = <JobResultsEmpty q={this.state.q}/>
        if (!!this.state.results && this.state.results.count > 0)
            results = <JobResults results={this.state.results}/>


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
