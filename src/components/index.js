// !全局注册组件步骤，
// !引入需要注册的组件，用数组收集起来
//  !Vue.use(plugins)
// ! plugin  对象 initial 属性，==》会被执行， initial方法，===》第一个参数 Vue
// ! 函数， 被initial 方法，会被执行 函数第一个参数是vue
// import PageTools from './pageTools/index.vue'
// !暴露出去一个对象
// export default {
//   install: function(Vue) {
//     components.forEach(ele => {
//       console.log(ele)
//       Vue.component(ele.name, ele)
//     })
//   }
// }
// const components = [PageTools]
// !require.context() 第一个参数路径，第二个参数是否查找子级 第三个正则要查找的文件后缀
const fn = require.context('./', true, /\.vue$/)
// !console.log(fn.keys()) // 模块路径
// !!console.log(fn('./pageTools/index.vue')) /* 根据路径查询具体模块 */
// 一次性导入所有模块
// !fn.keys() ==> 返回所有模块['./pageTools/index.vue']
const components = fn.keys().map(ele => {
  return fn(ele)
})
// !简写可以直击暴露一个函数
export default (Vue) => {
  components.forEach(ele => {
    console.log(ele.default)
    Vue.component(ele.default.name, ele.default)
  })
}

