// 数据接口地址
var env = 'develop' // 本地测试时使用
// var env = 'develop_online' // 本地测试时使用线上测试地址
// var env = 'build' // 测试打包发布时使用
// var env = 'production' // 正式打包发布时使用

// const serveUrl = env === 'develop' ? 'http://10.10.10.117:81/api' : (env === 'build' ? 'http://www.vxhro.com:81' : 'https://www.vxhro.com')
const serveUrl = () => {
  if (env === 'develop') {
    return 'http://10.10.10.117:81/api'
  } else if (env === 'develop_online') {
    return 'http://www.vxhro.com:81/api'
  } else if (env === 'build') {
    return 'http://www.vxhro.com:81'
  } else {
    return 'https://www.vxhro.com'
  }
}
const apiUrl = (env === 'develop' || env === 'develop_online') ? '/api' : (env === 'build' ? 'http://www.vxhro.com:81/api' : 'https://www.vxhro.com/api')

export default {
  env,
  serveUrl,
  apiUrl
}
