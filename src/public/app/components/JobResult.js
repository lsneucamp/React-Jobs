import React from 'react'


class JobSearchResult extends React.Component {
    constructor({result}) {
        super()
        this.state = result
    }

    render() {
        return (
            <div className="row job-result" ref='row'>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12"><h3>{this.state.title}</h3></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            Company: {this.state.companyName} - Location: {this.state.location} - Experience: {this.state.experience||'N/A'}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-justify">
                          <p>{this.state.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default JobSearchResult