<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="dialogVisible" @close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form
      ref="addDeptForm"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option v-for="item in peoples" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button v-loading="loading" type="primary" size="small" @click="submit">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { getEmployeeSimple, addDepartments } from '@/api/employees'
export default {
  name: 'HrsaasAddDept',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    treeNode: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    //! 部门编码
    const codeCheck = async(rule, value, callback) => {
      // 拿到所有的部门数据，一个个比较过去 如果出现重复 校验不通过 否则通过 不通过把错误报出去
      const { depts } = await getDepartments()
      console.log(depts)
      const isRepeat = depts.some(ele => ele.code === value)
      isRepeat ? callback(new Error(`模块下已经存在${value}`)) : callback()
    }
    // !部门名称，
    const nameCheck = async(rule, value, callback) => {
      // 拿到所有的部门数据，一个个比较过去 如果出现重复 校验不通过 否则通过 不通过把错误报出去
      const { depts } = await getDepartments()
      console.log(depts)
      console.log(this.treeNode.id)
      const deptstj = depts.filter(item => item.pid === this.treeNode.id)
      // console.log(deptstj)
      // !some进项判筛选 找得到爆出错误
      const isRepeat = deptstj.some(ele => ele.name === value)

      isRepeat ? callback(new Error(`该部门下已经存在${value}部门名称`)) : callback()
    }
    return {
      peoples: [],
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍

      },
      loading: false,
      rules: {
        name: [{ required: true, message: '部门名称必填', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称1~50个字符', trigger: 'blur' },
          { validator: nameCheck, trigger: 'blur' }],
        code: [{ required: true, message: '部门编码', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码1~50个字符', trigger: 'blur' },
          { validator: codeCheck, trigger: 'blur' }],
        manager: [{ required: true, message: '部门管理者必填' }
        ],
        introduce: [{ required: true, message: '部门介绍必填', trigger: 'blur' },
          { min: 1, max: 300, message: '部门介绍1~300个字符', trigger: 'blur' }]
      }
    }
  },
  created() {

  },
  methods: {
    async  getEmployeeSimple() {
      const res = await getEmployeeSimple()
      this.peoples = res
      console.log(res)
    },
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.addDeptForm.resetFields()
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    async   submit() {
      // 表单校验成功后发请求
      try {
        this.loading = true
        await this.$refs.addDeptForm.validate()
        await addDepartments({ ...this.formData, pid: this.treeNode.id })
        this.$message.success('新增成功')
        this.$parent.getDepartments()
        this.handleClose()
      } catch (e) {
        console.log(666)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
