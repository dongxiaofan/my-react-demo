

import EnumApi from '@/api/Enum.api'
import SysBasedataApi from '@/api/SysBasedata.api'

// 返回URL参数
function queryUrlParams(str:any) {
  // 获取问号后面所有的字符
  var index = str.indexOf("?")
  str = str.substr(index+1)
  // 把& 符号分割掉
  var arr = str.split("&")
  // 创建对象, 遍历数组
  var obj = {}
  for(var i = 0 ;  i < arr.length; i++){
    // 遍历的分割掉 =
    var newArr = arr[i].split("=")
    obj[newArr[0]]= newArr[1]
  }
  return obj
}

// 数据字典
function getEnum (groupName, arr) {
  let groupArr = groupName.split(',')
  EnumApi.getEnum({ groupName: groupName }).then(res => {
    groupArr.map((str, index) => {
      let strArr = str.split('.')
      if (res[index].group.toLowerCase() === str.toLowerCase()) {
        res[index].items.map(item => {
          arr[strArr[1]].push({ label: item.value, value: item.key })
        })
      }
    })
  })
}

// 数据字典-用工形式/到款银行
function getSelectValueList (typeName, arr) {
  let typeArr = typeName.split(',')
  SysBasedataApi.getSelectValueList({ type: typeName }).then(res => {
    typeArr.map((str) => {
      res.data.map(item => {
        arr[str].push({ label: item.text, value: item.value })
      })
    })
  })
}

export default {
  queryUrlParams,
  getEnum,
  getSelectValueList
}