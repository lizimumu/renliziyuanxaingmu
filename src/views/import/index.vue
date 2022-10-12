<template>
  <div>  <upload-excel :on-success="handleSuccess" /></div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async    handleSuccess({ header, results }) {
      console.log(header)
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber'
      }
      const arr = []
      results.forEach(item => {
        const userinfo = {}
        // console.log(item)
        // console.log(Object.keys(item))
        Object.keys(item).forEach(key => {
          userinfo[userRelations[key]] = item[key]
        })
        arr.push(userinfo)
      })
      console.log(arr)
      await importEmployee(arr)
      this.$message.success('批量导入成功')
      this.$router.back()
    }
    // beforeUpload(file) {
    //   console.log(file)
    //   if (file.size > 1024) {
    //     this.$message.error('文件太大')
    //     return false
    //   }
    //   return true
    // }
  }
}
</script>

<style>

</style>
