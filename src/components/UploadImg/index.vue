<template>
  <div><el-upload
         v-loading="loading"
         class="uploadImg"
         action="#"
         list-type="picture-card"
         :on-preview="onPreview"
         :on-remove="onremove"
         :file-list="fileList"
         :on-change="onchange"
         :http-request="onHttpRequest"
         :limit="1"
         :before-upload="beforeUpload"
       >
         <i class="el-icon-plus" />
       </el-upload>
    <!-- 预览弹层 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      1
      <img style="width:100%;" :src="previewURL" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
// console.log(COS)
const cos = new COS({
  SecretId: 'AKIDTpzwfAUbT7h5E8nERP9gz3tTotjXAZje',
  SecretKey: 'jFXaR9dvxkIbecNtBKI2YpsiMmx2uYyA'
})
export default {
  name: 'UploadImg',
  props: {
    defaultUrl: {
      type: String,
      default: () => ''
    }
  },
  data() {
    return {
      loading: false,
      previewURL: '',
      dialogVisible: false,
      fileList: [
        // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ]
    }
  },
  // 监视父组件传递的数据
  watch: {
    defaultUrl() {
      this.fileList.push({ name: 'default', url: this.defaultUrl })
    }

  },
  methods: {
    onPreview(file) {
      this.previewURL = file.url
      this.dialogVisible = true
    },
    beforeUpload(file) {
      console.log(file)

      const allowTypes = ['image/png', 'image/jpeg', 'image/gif']
      // 上传之前进行效验
      const ishas = allowTypes.includes(file.type)
      if (!ishas) {
        this.$message.error('亲，只能上传' + allowTypes.join(', ') + '类型文件')
        return false
      }
      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传的图片不能大于1mb')
        return false
      }
    },
    onremove(file, fileList) {
      this.fileList = fileList
    },
    onchange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest({ file }) {
      this.loading = true
      console.log(file)
      cos.putObject({
        Bucket: 'hz-33-1314348469', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-shanghai', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: function(progressData) {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        console.log(err || data)
        // err 上传失败的信息 如果上传成功err 为null
        // data 上传成功的信息
        if (err) return this.$message.error('上传图片失败失败')
        // 图片上传成功后把数据用自定义事件传回父组件，让父组件决定要 用户自己控制干嘛
        this.loading = false
        this.$emit('on-success', {
          imgUrl: 'http://' + data.Location
        })
      })
    },
    handleClose() {
      this.dialogVisible = false
    }
  }
}
</script>

<style scoped lang='scss'>
.uploadImg{
  width: 148px;
  height: 148px;
  overflow: hidden;
}

</style>
