// 该文件中存放关于 json 的全局方法

/**
 * 将对象数组存放到 localStorage 中
 * @param {string} key: String 数据键名
 * @param {Array[object]} data[]: [object] 原始数组数据
 * @returns null
*/
export function stringifyObjArr(key, data) {
  if (!Array.isArray(data)) {
    return false
  } else {
    let formatData = []
    for (let i = 0; i < data.length; i++) {
      const element = data[i]
      formatData.push(JSON.stringify(element))
    }
    localStorage.setItem(key, JSON.stringify(formatData))
  }
}
/**
 * 将数据从 localStorage 取出并转化为对象数组格式
 * @param {string} key: String 数据键名
 * @returns {Array[number|string]} data[]: [object] 数组数据
*/
export function parseObjArr(key) {
  let rawData = JSON.parse(localStorage.getItem(key))
  if (!rawData || !Array.isArray(rawData)) {
    return false
  } else {
    let data = []
    for (let i = 0; i < rawData.length; i++) {
      const element = rawData[i]
      data.push(JSON.parse(element))
    }
    return data
  }
}

/**
 * 数组转化为字符串 '[1, 2]' 后放入 localStorage
 * @param {string} key: 数据键名
 * @param {Array} data: 数组数据
 * @returns null
 */
export function stringifyArr(key, data) {
  if (!data) {
    return false
  } else {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

/**
 * 从 localStorage 中拿出 '[1, 2]' 并格式化为数组
 * @param {string} key: 数据键名
 * @returns {Array} : data[] 数组数据
 */
export function parseArr(key) {
  return JSON.parse(localStorage.getItem(key))
}
