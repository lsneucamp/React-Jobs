import axios from 'axios'
import JobConstants from './job.constants'
import {dispatcher} from '../../dispatchers/AppDispatcher.js'

export default {
    searchJob(queryParams){
        axios.get(`/api/jobs`,{params:queryParams}).then(function(response){
            const {data} = response
            dispatcher({actionType:JobConstants.SEARCH_JOB,data})
        },function (err) {
            console.err(err)
        })
    }
}

