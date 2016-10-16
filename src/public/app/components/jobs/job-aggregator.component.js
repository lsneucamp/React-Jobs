import React from 'react'
import SearchForm from '../commons/forms/search-form'
import PortalLogo from '../commons/portal-logo.component'
import FixedImagePanel from '../commons/fixed-image-panel.component'
import JobStore from './job.store'
import JobActions from './job.actions'


export default class JobAggregator extends React.Component {

    constructor(props) {
        super(props)
        this.state= {
            filters:[]
        }
        this._checkboxArr = []
    }

    componentWillMount(){
        const {type} = this.props.agg
        const filters = this.props.filters || []
        this.state.type = type
        this.state.filters = filters

        // this.setState({type,filters})
    }

    onChange(e) {
        console.log('onChange',e.target.value)
        this.state.filters = this.toggle(e.target.value)
        this.setState(this.state)
        this.props.onAddFilter(this.state.type,this.state.filters)
    }

    isChecked(value) {
        return this.state.filters.indexOf(value)!==-1
    }

    toggle(val){
        let filters
        if(this.exists(val)){
            filters = this.remove(val)
        } else {
            filters =  this.add(val)
        }
        return filters
    }

    remove(val) {
        return this.state.filters.filter((filter)=>{
            return filter !== val
        })
    }

    add(val){
       if(!this.exists(val)){
           this.state.filters.push(val)
       }
       return this.state.filters
    }

    exists(val){
        const exists = this.state.filters.filter((filter)=>{
            return filter == val
        })
        return exists.length>0
    }

    render() {
        const {name, buckets} = this.props.agg

        const checkBoxes = buckets.map((bucket, index) => {
            return (
                <div className="col-sm-12" key={index}>
                    <div className="checkbox">
                        <label>
                            <input type="checkbox"
                                   onChange={this.onChange.bind(this)}
                                   value={bucket.key}
                                   checked={this.isChecked(bucket.key)}
                                   aria-label={bucket.key}
                                   //register elements
                                   ref={(c) => this._checkboxArr.push(c)}

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
        type: React.PropTypes.string.isRequired,
        buckets: React.PropTypes.array.isRequired
    }),
    filters: React.PropTypes.array
};
