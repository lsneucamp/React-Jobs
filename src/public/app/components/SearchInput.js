import React from 'react'


class JobSearchInput extends React.Component {
    constructor() {
        super()
    }

    submitHandler(e) {
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
                <div className="container">
                    <form className="row" onSubmit={this.submitHandler.bind(this)}>
                        <div className="col-sm-10 ">
                                <input type="text" defaultValue={this.props.q} className="form-control" id="searchTerm"
                                       placeholder="Press Enter Search a Job e.g. software "/>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default JobSearchInput