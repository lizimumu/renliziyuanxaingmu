<template>
  <div class="app-container">
    <PageTools>
      <template #before>
        <span>共166条记录</span>
      </template>

      <template #after>
        <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
        <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
        <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" type="index" sortable="" width="80" />
        <el-table-column label="姓名" prop="username" />
        <el-table-column label="工号" prop="workNumber" />
        <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn">
          <!-- <template slot-scope="{row}">
            <span>{{ row.formOfEmployment }}</span>
          </template> -->
        </el-table-column>
        <el-table-column label="部门" prop="departmentName" />
        <el-table-column label="入职时间" sortable="" prop="timeOfEntry"><template slot-scope="{row}">
          {{ row.timeOfEntry | formatDate }}
        </template></el-table-column>
        <el-table-column label="账户状态" prop="enableState">
          <template slot-scope="{row}">
            <el-switch
              :value="row.enableState === 1"
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small" @click="goDetail(row)">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next,sizes,total"
          :total="total"
          :current-page.sync="page.page"
          :page-size.sync="page.size"
          :page-sizes="[2,5,10]"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>

    <!-- 相当于：:dialogVisible='dialogVisible' @update:dialogVisible='val=> dialogVisible=value ' -->
    <addEmployeeList :dialog-visible.sync="dialogVisible" />
  </div>
</template>
<script>
// import PageTools from '@/components/pageTools/index.vue'
import { getEmployeeList, delEmployee } from '@/api/employees'
import EnumHireType from '@/api/constant/employees'
import addEmployeeList from './components/add-employee.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    addEmployeeList
  },
  data() {
    return {
      loading: false,
      page: {
        page: 1,
        size: 10
      },
      dialogVisible: false,
      list: [],
      total: 0,
      hireType: EnumHireType.hireType
    }
  },

  mounted() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      try {
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        this.list = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellValue) {
      // console.log(row, column, cellValue)
      const res = this.hireType.find(ele => ele.id === cellValue)
      // console.log(res)
      return (res && res.value) || '非正式'
    },
    handleEmploy() {
      // 点击需要弹出新增弹框
      this.dialogVisible = true
    },
    async del(id) {
      try {
        await this.$confirm('确认删除角色吗？', '提示', {
          type: 'warning' })
        // 调用删除接口
        await delEmployee(id)
        this.getEmployeeList()
      } catch (e) {
        console.log(e)
      }
    },
    async  exportExcel() {
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      console.log(rows)
      const { export_json_to_excel } = await import('@/vendor/Export2Excel.js')
      const exportExcelMapPath = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(exportExcelMapPath)
      const data = rows.map((item) => {
      // console.log(item);
        return header.map(h => {
          if (h === '聘用形式') {
            // !进行判断筛选  如果h 等于聘用形式
            // !循环利用 find 查找匹配的一项，在返回对应的值，如果没查找到返回未知
            const find = this.hireType.find(hire => {
              return hire.id === item[exportExcelMapPath[h]]
            })
            return find ? find.value : '未知'
          }
          // 循环表头
          //  根据映射表，返回数据
          return item[exportExcelMapPath[h]]
        })
      })
      console.log(data)
      export_json_to_excel({
        header, // 表头 必填
        // data:[['张三'，‘电话’，‘管理员’],['李四'，‘电话’，‘管理员’]]
        // data里面的二伪数组，每一个数组是每一行的数据npm
        multiHeader: [['手机号', '核心信息', '', '', '', '其他信息', '']],
        merges: ['A1:A2', 'B1:E1', 'F1:G1'],
        data, // 具体数据 必填
        filename: '黑马员工列表', // 非必填
        autoWidth: true, // 宽度子适应
        bookType: 'xlsx' // 文件类型
      })
    },
    goDetail(row) {
    // 利用动态路由占位传参，获取对应的id 跳转页面
      this.$router.push('/employees/detail/' + row.id)
    } }
}
</script>

<style lang="scss" scoped>

</style>
