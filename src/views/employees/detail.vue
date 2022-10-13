<template>
  <div class="dashboard-container">
    <div class="app-container">

      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane lazy label="登录账户设置" name="first">
            <!-- 表单效验 from
            1.form组件 :model='表单数据' ：rules='效验规则 '
            2.form-iem :prop 属性 -->
            <el-form ref="form" label-width="120px" style="margin-left: 120px; margin-top:30px" :rules="rules" :model="accountInfo">
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="accountInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="accountInfo.password" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployees">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane lazy label="个人详情" name="second"><UserInfo /></el-tab-pane>
          <el-tab-pane lazy label="岗位信息" name="third"><JobInfo /></el-tab-pane>

        </el-tabs>

      </el-card>
    </div></div>

</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user'
import UserInfo from './components/user-info.vue'
import JobInfo from './components/job-info.vue'
import Cookies from 'js-cookie'
export default {
  name: 'Detail',
  components: {
    UserInfo,
    JobInfo

  },
  data() {
    return {
      activeName: Cookies.get('activeName') || 'first',
      accountInfo: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: 2, max: 9, message: '长度在2-10个字符', trigger: 'blur' }],
        password: [{ required: true, message: '强输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.loadEmployeesInfo()
  },
  methods: {
    handleClick() {
      Cookies.set('activeName', this.activeName)
    },
    async loadEmployeesInfo() {
      const res = await getUserDetailById(this.$route.params.id)
      console.log(res)
      this.accountInfo = res
    },
    // 更新用户信息
    async  updateEmployees() {
      try {
        await this.$refs.form.validate()
        const res = await saveUserDetailById(this.accountInfo)
        console.log(res)
        // this.$message.success(res.message)
        console.log('校验成功')
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<style>

</style>
