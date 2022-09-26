import router from '@/router'
import store from '@/store'

// !1,判断token是否存在
// !1.1存在处于登录状态是否去往登录页处于则去首页否则放行
// !1,2不存在不处于登录状态是否处于白名单处于则放行否则登录页
const whiteList = ['/login', '/404'] // 定义白名单  所有不受权限控制的页面
router.beforeEach((to, from, next) => {
  // !如果有token去登录页，那么就跳转到首页
  console.log(store.getters.token)
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 没有token还去登录页直接放行
      next()
    }
  } else {
    // 如果过没有token还在白名单直接放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
