import axios from 'axios'

const get = (url, params) => {
    return request({
        method: 'get',
        url,
        params
    })
  }

const post = (url, data, params) => {
    return request({
        method: 'post',
        url,
        data,
        params
    })
  }

const put = (url, data, params) => {
    return request({
        method: 'put',
        url,
        data,
        params
    })
  }

const del = (url, query, headers) => {
    return request({
        method: 'delete',
        url
    })
  }

const request = (options) => {
    return axios(options).then(res => res.data)
}

export {
    get,
    post,
    put,
    del
}