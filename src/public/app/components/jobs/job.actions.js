import axios from 'axios'
import JobConstants from './job.constants'
import {dispatcher} from '../../dispatchers/AppDispatcher.js'

const url = 'http://localhost:8000'

export default {
    searchJob(q){
        console.debug("JobAction.searchJob",q)
        axios.get(`${url}/api/jobs`,{params:{q}}).then(function(response){
            const {data} = response
            dispatcher({actionType:JobConstants.SEARCH_JOB,data})
        },function (err) {
            console.err(err)
        })
    }
}

