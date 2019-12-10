import axios from 'axios'
import { message } from 'antd'

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

function getPromise(url, data, method) {
  return new Promise((resolve, reject) => {
    axios.request({
      url: '/api' + `${url}`,
      header: getHeader(),
      method: method,
      data: data
    }).then((res) => {
      if (res.data.code === 403) {
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
    return getPromise(url, data, 'GET')
  },
  post: function(url, data) {
    return getPromise(url, data, 'POST')
  },
  put: function(url, data) {
    return getPromise(url, data, 'PUT')
  },
  delete: function(url, data) {
    return getPromise(url, data, 'DELETE')
  }
}
 
export default http