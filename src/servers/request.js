import axios from 'axios'


export function get(url,params){
    return axios.get(url,{params})
}

export function post(url,data){
    return axios.post(url,data)
}