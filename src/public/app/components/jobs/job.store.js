import JobConstants from './job.constants'
import AbstractStore from '../commons/abstract.store'


class JobStore extends AbstractStore {

    constructor() {
        super();
        this.subscribe(() => this._registerToActions.bind(this))
        this._result_page = {}
    }

    _registerToActions(action) {
        switch (action.actionType) {
            case JobConstants.SEARCH_JOB:
                this._result_page = action.data
                break
            case JobConstants.GET_JOB:
                this._job = null
                break
            default:
                break
        }
        this.emitChange()
    }

    getResults() {
        return this._result_page
    }

    getJob() {
        return this._job !== null
    }
}

export default new JobStore
