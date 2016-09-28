import React from 'react'


class JobSearchInput extends React.Component {
    constructor() {
        super()
    }

    submitHandler(e){
        e.preventDefault()
        this.props.onQueryChange(e.target.searchTerm.value)
    }


    render() {
        return (
            <div className="job-search-input">
                <div className="row text-center">
                    <div className="col-sm-12">
                        <div className="portal-logo">

                        </div>
                    </div>
                    <div className="col-sm-12">

                        <p className="lead">
                            Your first job source portal!
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-offset-1 col-md-offset-2 col-lg-offset-3 col-sm-10 col-md-8 col-lg-6">
                        <small>Common search terms to try: software engineer full stack developer programmer test</small>
                    </div>
                    <div className="col-sm-offset-1 col-md-offset-2 col-lg-offset-3 col-sm-10 col-md-8 col-lg-6">
                        <small>Also you may try locations and company names e.g.: San Francisco New York microsoft facebook</small>
                    </div>
                    <div className="col-sm-offset-1 col-md-offset-2 col-lg-offset-3 col-sm-10 col-md-8 col-lg-6">
                        <small>Type search term bellow and press [Enter]</small>
                    </div>
                </div>
                <form className="row text-center" onSubmit={this.submitHandler.bind(this)}>
                    <div className="form-group">
                        <div className="col-sm-offset-1 col-md-offset-2 col-lg-offset-3 col-sm-10 col-md-8 col-lg-6">
                            <input type="text" defaultValue={this.props.q}  className="form-control" id="searchTerm" placeholder="Press Enter Search a Job"/>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default JobSearchInput