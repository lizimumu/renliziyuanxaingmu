import { login } from '@/api/login'
import { getUserInfoAPI, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    // 清除用户名
    REMOVE_USER_INFO(state) {
      state.userInfo = {}
    },
    REMOVE_TOKEN(state) {
      state.token = null
    },
    SET_HRSAAS_TIME(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      // 接口
      console.log(888)
      const data = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
      commit('SET_HRSAAS_TIME', new Date().getTime())
    },
    async getUserInfo({ commit }) {
      const res = await getUserInfoAPI()
      const res1 = await getUserDetailById(res.userId)
      // console.log(res)
      const result = { ...res, ...res1 }
      // 接口请求
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))/* 后面会用  深拷贝一份返回出去 */
    },
    logout({ commit }) {
      // 清除原来数据===》token userinfo
      commit('REMOVE_USER_INFO')
      commit('REMOVE_TOKEN')
    }
  }
}
