import React from 'react'
import JobSearchInput from '../components/SearchInput'
import JobSearchResults from '../components/DisplayResults'
import AppActions from '../actions/AppActions'
import JobStore from '../stores/JobStore'
import NoJobResult from '../components/NoJobResult'


class JobSearchLayout extends React.Component {

    constructor(props, context) {
        super(props, context)
    }

    componentWillMount() {
        const q = this.props.location.query.q || ''
        this.setState({q})
        window.actions = AppActions
        // add change listener
        JobStore.addChangeListener(this.onResultsUpdate.bind(this))
        // search a job on mount
        AppActions.searchJob(q)
    }

    onQueryChange(q) {
        //  update state on change
        this.setState({q})
        // change context path and query
        this.context.router.push({pathname: '/search', query: {q: q}})
        // search a job
        AppActions.searchJob(q)
    }

    onResultsUpdate() {
        const results = JobStore.getJobResults();
        this.setState({results})
    }

    render() {
        let jobSearchResults =  <NoJobResult q={this.state.q}/>
        if( !!this.state.results &&
            !!this.state.results.count &&
            this.state.results.count > 0) {
            jobSearchResults = <JobSearchResults results={this.state.results}/>
        }
        return (
            <div>
                <div className="container-fluid job-search">
                    <JobSearchInput onQueryChange={this.onQueryChange.bind(this)} q={this.state.q}/>
                </div>
                <div className="container">
                    {jobSearchResults}
                </div>
            </div>
        )
    }

}
JobSearchLayout.contextTypes = {
    router: React.PropTypes.object
};

export default JobSearchLayout