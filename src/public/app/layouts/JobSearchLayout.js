import React from 'react'
import JobSearchInput from '../components/SearchInput'
import JobSearchResults from '../components/DisplayResults'
import AppActions from '../actions/AppActions'
import JobStore from '../stores/JobStore'


class JobSearchLayout extends React.Component {

    constructor(props, context) {
        super(props, context)
    }

    componentWillMount() {
        const q = this.props.location.query.q || ''
        this.setState({q})
        window.actions = AppActions
        JobStore.addChangeListener(this.onResultsUpdate.bind(this))
        AppActions.searchJob(q)
    }

    onQueryChange(q) {
        this.context.router.push({pathname: '/search', query: {q: q}})
        AppActions.searchJob(q)
    }

    onResultsUpdate() {
        const results = JobStore.getJobResults();
        this.setState({results})
    }

    render() {
        let jobSearchResults =  <div>noresult</div>
        if(!!this.state.results) {
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