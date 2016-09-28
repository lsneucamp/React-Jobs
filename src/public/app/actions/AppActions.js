import axios from 'axios'
import AppConstants from '../constants/AppConstants.js'
import {dispatcher,register} from '../dispatchers/AppDispatcher.js'

export default {
    searchJob(q){
        const results = {hits:[]}
        axios.get('/api/jobs',{params:{q}}).then(function(response){
            const {data} = response
            dispatcher({actionType:AppConstants.SEARCH_JOB,data})
        },function (err) {
            console.err(err)
        })


    }
}

