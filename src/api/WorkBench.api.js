import http from '@/axios/http.js'

export default class WorkBenchApi {
  // 数据总览
  static getDataScreen = (data) => http.get('/WorkBench/GetDataScreen', data)
}