import React from 'react'
import AggregatedResults from './AggregatedResult'
import JobSearchResult from './JobResult'

export default ({results}) => {
    const aggregatedResults = results.aggs.map((agg,index) => {
        return  <AggregatedResults key={index} name={agg.name} buckets={agg.buckets}/>
    })

    const jobResults  = results.results.map((result,index) => {
        return  <JobSearchResult key={index} result={result}/>
    })

    const tookInSeconds = results.took / 1000

    return (
        <div className="row job-results">
            <div className="hidden-xs hidden-sm col-md-3">
                {aggregatedResults}
            </div>
            <div className="col-sm-12 col-md-8">
                <div className="row job-result">
                    <div className="col-sm-12">
                        <p className="lead" style={{'marginTop': '5px'}}>
                            Took {tookInSeconds} seconds to find {results.count} job posts
                        </p>
                    </div>
                </div>
                {jobResults}
            </div>
        </div>
    )
}
