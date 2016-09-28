import axios from 'axios'
import {getCookie,clearCookie} from '../utils/cookie.js'


export default {
    search(q) {
        return new Promise((resolve, reject) => {

            axios.get(`http://lucianos-imac.local:9999/user`, {
                params: {access_token}
            }).then((response)=> {
                console.log('_get_user_info_get_then', response)
                resolve(response.data)
            }).catch(function (response) {
                if (response.status === 401) {
                    clearCookie('token_key')
                }
                console.error('_get_user_info_get_catch', response)
                reject(response.status)
            })
        })

    }
}