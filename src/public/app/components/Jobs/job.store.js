import AppConstants from '../constants/AppConstants'
import DefaultStore from '../commons/DefaultStore'


class JobStore extends DefaultStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this))
        this._job_results = {}
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case AppConstants.SEARCH_JOB:
                this._job_results = action.data
                console.log('action',action,this._job_results)
                break
            case AppConstants.GET_JOB:
                this._job = null
                break
            default:
                break
        }
        this.emitChange()
    }

    getJobResults() {
        console.log('getJobResults',this._job_results)

        return this._job_results
    }

    getJob() {
        return this._job !== null
    }
}

export default new JobStore
