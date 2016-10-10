import React from 'react'
import SearchForm from '../commons/forms/search-form'
import PortalLogo from '../commons/portal-logo.component'
import FixedImagePanel from '../commons/fixed-image-panel.component'
import JobStore from './job.store'
import JobActions from './job.actions'


export default class JobAggregator extends React.Component {

    constructor(props) {
        super(props)
    }

    onChange(e) {
        console.debug("JobResults", e.target.value)
    }

    render() {
        const {name, buckets} = this.props.agg

        const checkBoxes = buckets.map((bucket, index) => {
            return (
                <div className="col-sm-12" key={index}>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox" onChange={this.onChange.bind(this)} value={bucket.key}
                                   aria-label={bucket.key}
                            /> {bucket.key} ({bucket.doc_count})
                        </label>
                    </div>
                </div>
            )
        })

        return (
            <div className="row">
                <div className="col-sm-12">
                    <h4>{name}</h4>
                </div>
                {checkBoxes}
            </div>
        )
    }
}

JobAggregator.propTypes = {
    agg: React.PropTypes.shape({
        name: React.PropTypes.string.isRequired,
        buckets: React.PropTypes.array.isRequired
    })

};
