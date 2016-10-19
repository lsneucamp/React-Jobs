import React from 'react'
import SearchForm from '../commons/forms/search-form'
import PortalLogo from '../commons/portal-logo.component'
import FixedImagePanel from '../commons/fixed-image-panel.component'
import JobStore from './job.store'
import JobAggregator from './job-aggregator.component'
import JobResult from './job-result.component'


export default class JobResults extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const {took,count,pages,page,size,results,aggs} = this.props.results

        const aggsComponents = aggs.map((agg,index)=>{
             let filters  = this.props.filters[agg.type]
             return <JobAggregator filters={filters} onAddFilter={this.props.onAddFilter} key={index} agg={agg} />
        })

        const resultComponents = results.map((result,index)=>{
             return <JobResult key={index} result={result} />
        })


        return (
            <div className="row">
                <div className="hidden-sm col-sm-3 ">
                    {aggsComponents}
                </div>
                <div className="col-xs-12 col-sm-8 ">
                    {resultComponents}
                </div>
            </div>
        )
    }
}

JobResults.propTypes = {
    onAddFilter:React.PropTypes.func,
    filters:React.PropTypes.object,
    results: React.PropTypes.shape({
        took: React.PropTypes.number.isRequired,
        count: React.PropTypes.number.isRequired,
        pages: React.PropTypes.number.isRequired,
        page: React.PropTypes.number.isRequired,
        size: React.PropTypes.number.isRequired,
        results: React.PropTypes.array.isRequired,
        aggs: React.PropTypes.array.isRequired
    })
};
