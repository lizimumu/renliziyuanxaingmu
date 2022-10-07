<template>
  <div>
    <!-- 具名插槽，新语法 -->
    <PageTools type="warning">
      <!--  <template v-slot:before><span>共25条数据</span></template> -->
      <!-- 具名插槽简写 -->
      <!-- <template #before><span>共25条数据</span></template> -->
      <!-- 作用域插槽 -->
      <!-- <template v-slot:before="scope"><span>共25条数据{{ scope.aa }}</span></template> -->
      <template #before>
        <span>共25条记录</span>
      </template>
      <template v-slot:after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>
    </pageTools>
  </div>
</template>

<script>
// import PageTools from '@/components/pageTools/index.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    // PageTools
  },
  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
