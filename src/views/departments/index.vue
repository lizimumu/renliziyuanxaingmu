<template>
  <div class="departments-container">
    <el-card>
      <!-- 使用组件传入数据 -->
      <tree-tools :tree-node="company" :is-root="false" @addDept="handleDddDept" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps">
      <tree-tools slot-scope="{data}" :tree-node="data" @addDept="handleDddDept" />

    </el-tree>
    <addDept :dialog-visible.sync="dialogVisible" :tree-node="currentNode" />
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
      }
    }
  },
  created() {
    this.getDepartments()
  },
  methods: {
    async  getDepartments() {
      const { depts, companyManage, companyName } = await getDepartments()
      console.log(depts)
      this.departs = tranListTToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage, id: '' }
      console.log(this.departs)
    },
    handleDddDept(node) {
      console.log(666)
      this.dialogVisible = true
      this.currentNode = node
      // console.log(this.currentNode)
      // console.log(this.dialogVisible)
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
