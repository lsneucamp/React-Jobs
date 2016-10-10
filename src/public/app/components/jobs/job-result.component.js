import React from 'react'


class JobResult extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            companyName,
            description,
            experience,
            location,
            title,
            id
        } = this.props.result


        return (
            <div className="row" ref='row'>
                <div className="col-sm-12">
                    <div className="row">
                        <div className="col-sm-12"><h3>{title}</h3></div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            Company: {companyName} - Location: {location} -
                            Experience: {experience || 'N/A'}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 text-justify">
                            <p>{description}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

JobResult.propTypes = {
    result: React.PropTypes.shape({
        companyName: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        experience: React.PropTypes.string,
        location: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired
    })

};

export default JobResult

