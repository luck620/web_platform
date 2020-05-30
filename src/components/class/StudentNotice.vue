<template>
  <div>
    <div class="wrap_body">
      <ul class="ul_tab">
        <li class="li_item">已发布公告</li>
      </ul>
    </div>
    <div class="content">
      <div v-for="(item, key) in courseList" :item="item" :key="key" class="new-item" @click='findDetails(item.id)'>
        <ul>
          <li class="li_title">{{item.date}}-----{{item.title}}</li>
        </ul>
      </div>
      <div class="page_push">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[6,9]"
          :page-size="queryInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <!--发布公告-->
    <el-dialog title="发布公告" :visible.sync="courseDialogVisible" width="30%" class="dialog" @close="addNoticeClosed">
      <el-form :model="noticeForm" :rules="noticeFormRules" ref="noticeFormRef" label-width="100px">
        <el-form-item>
          选择课程：<el-select v-model="courseId" filterable remote reserve-keyword :remote-method="remoteMethod"  placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          发布时间：<el-date-picker
          v-model="noticeForm.date"
          value-format="yyyy-MM-dd HH:mm:ss"
          :unlink-panels=true
          type="datetime"
          placeholder="请选择日期" clearable>
        </el-date-picker>
        </el-form-item>
        <el-form-item label="公告标题" prop="title">
          <el-input v-model="noticeForm.title"></el-input>
        </el-form-item>
        <el-form-item label="公告内容" prop="text">
          <el-input v-model="noticeForm.content" type="textarea"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="avatar-uploader"
            :multiple="true"
            action="http://upload-z2.qiniup.com"
            accept="application/msword"
            :show-file-list="false"
            :data="postData"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-error="handleError">
            <el-button size="mini" round style="margin-top: 5px;margin-left: 50px">点击上传群公告文件</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="courseDialogVisible = false" >取 消</el-button>
        <el-button type="primary" @click="addCourseNotice" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ClassManager',
  inject: ['reload'],
  data () {
    return {
      noticeForm: {
        title: '',
        date: '',
        content: ''
      },
      noticeFormRules: {
        title: [
          { required: true, message: '请输入公告标题', trigger: 'blur' }
        ],
        date: [
          { required: true, message: '请输入公告时间', trigger: 'blur' }
        ]
      },
      courseId: '',
      options: [],
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0,
      postData: {
        token: '',
        key: ''
      },
      wordUrl: '',
      wordURL: '',
      courseDialogVisible: false,
      courseList: {
        name: '',
        weekNum: '',
        periodNum: '',
        description: '',
        courseNO: ''
      }
    }
  },
  created () {
    this.getToken()
    this.getCourseNotice()
    this.remoteMethod()
  },
  methods: {
    findDetails (id) {
      window.sessionStorage.setItem('noticeId', id)
      const routeData = this.$router.resolve('/noticeDetail')
      window.open(routeData.href, '_blank')
    },
    addNoticeClosed () {
      this.$refs.noticeFormRef.resetFields()
    },
    async remoteMethod () {
      this.$http.get('http://localhost:8080/course/getCourseListWithoutPage').then((res) => {
        console.log(res)
        this.options = res.data
      })
    },
    getCourseDetail (id) {
      console.log(id)
      // this.$http.get('http://localhost:8080/course/getCourseList/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize + '').then((res) => {
      //   console.log(res)
      //   this.courseList = res.data.content
      // })
    },
    handleSizeChange (newSize) {
      console.log(123)
      this.queryInfo.pageSize = newSize
      this.getCourse()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getCourse()
    },
    async getCourseNotice () {
      await this.$http.get('http://localhost:8080/notice/getCourseStuNotice/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize + '/' + window.sessionStorage.getItem('loginId') + '').then((res) => {
        console.log(res)
        this.courseList = res.data.content
        this.total = res.data.totalElements
      })
    },
    async addCourseNotice () {
      console.log(this.courseId)
      const { data: res } = await this.$http.post('http://localhost:8080/notice/addCourseNotice/' + this.courseId + '/' + this.wordURL + '', this.noticeForm)
      console.log(res)
      if (res.code !== 200) {
        this.$message.error('发布失败！')
      }
      this.$message.success('发布成功！')
      this.courseDialogVisible = false
      this.reload()
    },
    async getToken () {
      await this.$http.get('http://localhost:8080/getUpToken').then((res) => {
        console.log(res)
        this.postData.token = res.data
      })
    },
    handleError: function (res) {
      console.log(res)
      this.$message({
        message: '上传失败',
        duration: 2000,
        type: 'warning'
      })
    },
    handleAvatarSuccess (res, file) {
      console.log(res)
      console.log(file)
      console.log(file.raw)
      this.$message.success('上传成功')
      this.wordUrl = 'http://qaath1lbd.bkt.clouddn.com/' + res.key
      this.wordURL = res.key
      console.log(this.wordUrl)
    },
    beforeAvatarUpload (file) {
      this.postData.key = file.name
      const isWord = file.type === 'application/msword'
      const isLt10M = file.size / 1024 / 1024 < 10

      if (!isWord) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isWord && isLt10M
    }
  }
}
</script>

<style scoped>
  .new-item {
    margin-left: 20px;
    cursor: pointer;
  }
  .li_title {
    display: list-item;
    list-style-type: circle;
  }
  .diaglog >>> .el-input__inner {
    width: 300px!important;
    margin-right: 30px;
    margin-bottom: 15px;
  }
  .h4_test{
    color: #df5000;
  }
  .top_plugin{
    height: 100px;
  }
  .left_select{
    float: left;
    margin-bottom: 20px;
  }
  .right_upload{
    float: right;
    margin-right: 30px;
  }
  .h3_name{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .p_others{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .course_content{
    margin-left: 10px;
  }
  .img_size{
    margin-left: 10px;
    margin-top: 5px;
    width: 250px;
    height: 169px;
  }
  .page_push{
    margin-top: 620px;
    margin-left: 400px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border: 1px dashed #5191d9;
  }
  .avatar {
    cursor: pointer;
    width: 100px;
    height: 100px;
    display: block;
  }
  .course{
    cursor: pointer;
    width: 270px;
    float: left;
    height: 300px;
    margin-left: 20px;
    margin-bottom: 20px;
    background-color: #d6d9c7;
  }
  .content_bottom{
    margin-left: 60px;
    width: 890px;
    background-color: #55a532;
  }
  .span_text{
    cursor: pointer;
    font-size: 16px;
    color: #0099ff;
  }
  .content_topRight {
    position: absolute;
    right: 280px;
    top: 85px;
    width: 85px;
    height: 40px;
    line-height: 40px;
  }
  .content {
    padding-top: 10px;
  }
  .wrap_body {
    width: 890px;
    height: auto!important;
    overflow: hidden;
    padding-top: 20px;
    position: relative;
    margin: 0 auto;
  }
  .ul_tab {
    width: 850px;
    height: 40px;
    padding-top: 12px;
    border-bottom: 2px #ccc solid;
    font-size: 20px;
    color: #777;
  }
  .li_item {
    float: left;
    width: 106px;
    height: 40px;
  }
  li {
    list-style-type: none;
    display: list-item;
    text-align: -webkit-match-parent;
  }
</style>
