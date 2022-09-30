<template>
  <div class="departments-container">
    <el-card>
      <tree-tools :tree-node="depart" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps">
      <tree-tools slot-scope="{data}" :tree-node="data" />
    </el-tree>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
export default {
  components: {
    TreeTools
  },
  data() {
    return {
      depart: { name: '总裁办', manager: '曹操' },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name'
      }
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
