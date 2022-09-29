<template>
  <div class="app-container">
    <el-card> <el-tabs v-model="activeName">
      <el-tab-pane label="角色管理" name="first">
        <el-row :gutter="10">
          <el-button type="primary" style="margin-left:10px;" size="small" icon="el-icon-plus" @click="add">新增角色</el-button>
        </el-row>
        <!-- 表格 -->
        <el-table v-loading="loading" style="width:100%" :data="roleList">
          <el-table-column label="序号" type="index" width="120" />
          <el-table-column label="角色名称" prop="name" width="240" />
          <el-table-column label="描述" prop="description" />
          <el-table-column label="操作" width="240">
            <template slot-scope="{row,$index}">
              <el-button size="small" type="success">分配权限</el-button>
              <el-button size="small" type="primary" @click="editRole(row,$index)">编辑</el-button>
              <el-button size="small" type="danger" @click="delRow(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <h2>{{ page.page }}</h2>
        <el-row
          :gutter="10"
          type="flex"
          justify="end"
          align="middle"
          style="height: 60px"
        ><el-pagination
          v-if="total > 0"
          background
          layout="prev, pager, next,sizes"
          :total="total"
          :current-page.sync="page.page"
          :page-size.sync="page.pagesize"
          :page-sizes="[2,5,10,15]"
          @current-change="getRoleList"
          @size-change="getRoleList"
        /><el-row />

        </el-row></el-tab-pane>
      <el-tab-pane label="公司信息" name="second"> <el-alert
        title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
        type="info"
        show-icon
        :closable="false"
      /><el-form label-width="120px" style="margin-top:50px">
        <el-form-item label="公司名称">
          <el-input v-model="formData.name" disabled style="width:400px" />
        </el-form-item>
        <el-form-item label="公司地址">
          <el-input v-model="formData.companyAddress" disabled style="width:400px" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.mailbox" disabled style="width:400px" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
        </el-form-item>
      </el-form></el-tab-pane>
    </el-tabs></el-card>
    <Addrole ref="addrole" :dialog-visible.sync=" dialogVisible" @refreshList="getRoleList" />
  </div>
</template>

<script>
import { getRoleListAPI, deleteRole, getCompanyInfo } from '@/api/setting'
import Addrole from './compoents/Addrole.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'HrsaasIndex',
  components: {
    Addrole
  },

  data() {
    return {
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      roleList: [],
      loading: false,
      dialogVisible: false,
      formData: ''
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  created() {
    this.getRoleList()
    this.getCompanyInfo()
  },

  methods: {
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.companyId)
      console.log(this.formData)
    },
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleListAPI(this.page)
        console.log(rows, total)
        this.total = total
        this.roleList = rows
        // total 大于0
        if (total > 0 && rows.length === 0) {
          this.page.page--
          this.getRoleList()
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    add() {
      this.dialogVisible = true
    },
    // !绑定点击事件
    // !拿到当行数据
    // !回显到新增角色组件上
    // !row直接赋值给子组件formData
    editRole(row, $index) {
      // console.log($index)
      console.log(row)
      console.log(this.$refs.addrole)
      this.$refs.addrole.formData = { ...row }
      this.dialogVisible = true
    },
    // 删除
    async  delRow(id) {
      // this.$confirm('确认删除角色吗？', '提示', {
      //   confirmButtonText: '确认',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(success => {
      //   console.log(success)
      // }).catch(error => {
      //   console.log(error)
      // })
      try {
        await this.$confirm('确认删除角色吗？', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await deleteRole(id)
        this.getRoleList()
        console.log('success')
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
