import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
Vue.component('svg-icon', SvgIcon)
// !require.context 方法 可以实现批量导入文件
// !require.context(directory, useSubdirectories, regExp)
//! directory: 要查找的文件路径 第一个参数
// !useSubdirectories: 是否查找子目录 第二个参数
// !regExp: 要匹配文件的正则 第三个参数
// !返回一个方法 req方法
// !返回的方法具有一个 keys 属性
// !keys 函数 返回一个数组
const req = require.context('./svg', false, /\.svg$/)
// !['./dashboard.svg', './example.svg', './eye-open.svg', './eye.svg', './form.svg', './link.svg', './nested.svg', './password.svg', './table.svg', './tree.svg', './user.svg']
// !req函数  ==>根据路径 ，对应的模块导入进来来
// 引入模块化
// console.log(req)
// console.log(req('./dashboard.svg'))
// console.log(req.keys())

const requireAll = requireContext => {
  return requireContext.keys().map(value => requireContext(value))
}

// map 返回一个新数组
// 长度和原来一样
// 映射
requireAll(req)
// console.log(requireAll(req))
