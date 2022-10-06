<template>
  <div class="departments-container">
    <el-card>
      <!-- 使用组件传入数据 -->
      <tree-tools :tree-node="company" :is-root="false" @addDept="handleDddDept" />
    </el-card>
    <el-tree v-loading="loading" :data="departs" :props="defaultProps">
      <tree-tools slot-scope="{data}" :tree-node="data" @refreshList="getDepartments" @addDept="handleDddDept" @editDept="editDept" />

    </el-tree>
    <addDept ref="addDept" :dialog-visible.sync="dialogVisible" :tree-node="currentNode" />
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { tranListTToTreeData } from '@/utils/index'
import addDept from './components/add-dept.vue'
export default {
  components: {
    TreeTools,
    addDept
  },
  data() {
    return {
      company: {

      },
      currentNode: {},
      dialogVisible: false,
      // depart: { name: '总裁办', manager: '曹操' },
      departs: [],
      defaultProps: {
        label: 'name'
      },
      loading: false
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async  getDepartments() {
      try {
        this.loading = true
        const { depts, companyManage, companyName } = await getDepartments()
        console.log(depts)
        this.departs = tranListTToTreeData(depts, '')
        this.company = { name: companyName, manager: companyManage, id: '' }
        console.log(this.departs)
      } catch (e) {
        console.log(555)
      } finally {
        this.loading = false
      }
    },
    handleDddDept(node) {
      console.log(666)
      this.dialogVisible = true
      this.currentNode = node
      // console.log(this.currentNode)
      // console.log(this.dialogVisible)
    },
    editDept(node) {
      this.dialogVisible = true
      console.log(node)
      this.currentNode = { ...node }
      // 回显数据
      this.$refs.addDept.formData = { ...node }
    }
  }
}
</script>

<style lang="scss">
  .departments-container {
    width: 900px;
    margin: 20px auto;
    .el-tree {
      .el-tree-node__content {
        padding-right: 20px;
      }
    }
  }
</style>
