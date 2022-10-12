<template>
  <el-dialog title="新增员工" :visible="dialogVisible" @close="handleClose">
    <!-- 表单 -->
    <el-form ref="addEmploy" label-width="120px" :rules="rules" :model="formData">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:80%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:80%" placeholder="请选择">
          <el-option v-for="item in hireType" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:80%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:80%" placeholder="请选择部门" @focus="getDepartments" />
        <el-tree v-show="isShow" v-loading="loading" :data="treeData" :props="{label:'name'}" default-expand-all style="width:80%" @node-click="selectNode" />
      </el-form-item>
      <el-form-item label="转正时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.correctionTime" style="width:80%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import employeesEnum from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import { tranListTToTreeData } from '@/utils/index'
import { addEmployee } from '@/api/employees'
export default {
  name: 'HrsaasAddEmployee',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      hireType: employeesEnum.hireType,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: 'Please enter a username', trigger: 'blur' },
          { min: 1, max: 4, message: 'username 1~4', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: 'Please enter a mobile', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: 'mobile 不满足格式', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: 'Please enter a formOfEmployment' }
        ],
        timeOfEntry: [
          { required: true, message: 'Please enter a timeOfEntry' }
        ],
        workNumber: [
          { required: true, message: 'Please enter a workNumber', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: 'Please enter a departmentName' }
        ]
      },
      treeData: [],
      isShow: false
    }
  },

  mounted() {

  },

  methods: {
    handleClose() {
      console.log('哈哈哈')
      // 关闭表单重置和表单重新赋值
      this.isShow = false
      this.$emit('update:dialogVisible', false)
      this.$refs.addEmploy.resetFields()
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
    },
    async   getDepartments() {
      this.isShow = true
      this.loading = true
      const { depts } = await getDepartments()
      this.treeData = tranListTToTreeData(depts, '')
      this.loading = false
      // console.log(depts)
    },
    selectNode(node) {
      this.isShow = false
      console.log(node)
      this.formData.departmentName = node.name
    },
    async  btnOk() {
      try {
        await this.$refs.addEmploy.validate()
        await addEmployee(this.formData)
        this.handleClose()

        this.$parent.getEmployeeList()
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
