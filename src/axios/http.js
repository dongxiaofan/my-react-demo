import axios from 'axios'
import { message } from 'antd'
import config from './config'

function getHeader() {
  if (JSON.parse(localStorage.getItem('loginInfo'))) {
    let token = JSON.parse(localStorage.getItem('loginInfo')).access_token
    return {
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  }
  return {
    'content-type': 'application/json'
  }
}

function getPromiseOfData(url, data, method) {
  return new Promise((resolve, reject) => {
    axios.request({
      url: config.apiUrl + `${url}`,
      header: getHeader(),
      method: method,
      data: data
    }).then((res) => {
      if (+res.data.code === 403) {
        message.error(res.data.message)
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000)
      }
      resolve(res.data)
    }).catch((err) => {
      message.error(err.data.message)
      reject(err.data)
    })
  })
}

function getPromiseOfParam(url, data, method) {
  return new Promise((resolve, reject) => {
    axios.request({
      url: config.apiUrl + `${url}`,
      header: getHeader(),
      method: method,
      params: data
    }).then((res) => {
      if (+res.data.code === 403) {
        message.error(res.data.message)
        setTimeout(() => {
          window.location.href = '/login'
        }, 3000)
      }
      resolve(res.data)
    }).catch((err) => {
      message.error(err.data.message)
      reject(err.data)
    })
  })
}
 
const http = {
  get: function(url, data) {
    return getPromiseOfParam(url, data, 'GET')
  },
  getData: function(url, data) {
    return getPromiseOfData(url, data, 'GET')
  },
  post: function(url, data) {
    return getPromiseOfData(url, data, 'POST')
  },
  postParams: function(url, data) {
    return getPromiseOfParam(url, data, 'POST')
  },
  put: function(url, data) {
    return getPromiseOfData(url, data, 'PUT')
  },
  deleteParams: function(url, data) {
    return getPromiseOfParam(url, data, 'DELETE')
  },
  delete: function(url, data) {
    return getPromiseOfData(url, data, 'DELETE')
  }
}
 
export default http