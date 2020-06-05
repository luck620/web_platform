<template>
  <div>
    <div class="wrap_body">
      <ul class="ul_tab">
        <li class="li_item">我教的课</li>
      </ul>
    </div>
    <div class="content">
      <div class="content_topRight">
        <span class="span_text" @click="courseDialogVisible = true" >+创建课程</span>
      </div>
      <div class="content_bottom" v-for="(item,key) in courseList" :item="item" :key="key">
        <div class="course" @click="getCourseDetail(item.id)">
          <img :src="item.imageUrl" class="img_size">
          <div class="course_content">
            <h3 class="h3_name">{{item.name}}</h3>
           <p class="p_others"> 课程号：{{item.courseNO}}</p>
            <p class="p_others">周数：{{item.weekNum}}</p>
            <p class="p_others">每周课时：{{item.periodNum}}</p>
          </div>
        </div>
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
    <!--新建课程-->
    <el-dialog title="新建课程" :visible.sync="courseDialogVisible" width="30%" @close="courseDialogVisible = false">
      <el-form :model="courseForm" :rules="courseFormRules" ref="courseFormRef" label-width="80px">
        <el-form-item label="封面" prop="imageUrl">
          <el-upload
            class="avatar-uploader"
            :multiple="true"
            action="http://upload-z2.qiniup.com"
            accept="image/jpeg,image/gif,image/png,image/bmp"
            :show-file-list="false"
            :data="postData"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-error="handleError">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="课程名" prop="name">
          <el-input v-model="courseForm.name"></el-input>
        </el-form-item>
        <el-form-item label="课程号" prop="courseNO">
          <el-input v-model="courseForm.courseNO"></el-input>
        </el-form-item>
        <el-form-item label="周时" prop="weekNum">
          <el-input type="number" v-model="courseForm.weekNum"></el-input>
        </el-form-item>
        <el-form-item label="每周课时" prop="periodNum">
          <el-input type="number" v-model="courseForm.periodNum"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <el-input v-model="courseForm.description"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="courseDialogVisible = false" >取 消</el-button>
        <el-button type="primary" @click="addCourse" >确 定</el-button>
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
      queryInfo: {
        pageNum: 1,
        pageSize: 6
      },
      total: 0,
      postData: {
        token: '',
        key: ''
      },
      imageUrl: '',
      imageURL: '',
      courseDialogVisible: false,
      courseForm: {
        name: '',
        weekNum: '',
        periodNum: '',
        description: '',
        courseNO: ''
      },
      courseList: {
        name: '',
        weekNum: '',
        periodNum: '',
        description: '',
        courseNO: ''
      },
      courseFormRules: {
        name: [
          {
            required: true,
            message: '请输入课程名',
            trigger: 'blur'
          }
        ],
        weekNum: [
          {
            required: true,
            message: '请输入周时',
            trigger: 'blur'
          }
        ],
        periodNum: [
          {
            required: true,
            message: '请输入课时',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请输入课程描述',
            trigger: 'blur'
          }
        ],
        courseNO: [
          {
            required: true,
            message: '请输入课程号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created () {
    this.getToken()
    this.getCourse()
  },
  methods: {
    getCourseDetail (id) {
      console.log(id)
      window.sessionStorage.setItem('courseDetailId', id)
      const routeData = this.$router.resolve('/findCourseDetail')
      window.open(routeData.href, '_blank')
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
    async getCourse () {
      await this.$http.get('http://localhost:8080/course/getCourseListByTeacherId/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize + '/' + window.sessionStorage.getItem('loginId') + '').then((res) => {
        console.log(res)
        this.courseList = res.data.content
        this.total = res.data.totalElements
      })
    },
    async addCourse () {
      this.$refs.courseFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        const { data: res } = await this.$http.post('http://localhost:8080/course/addCourseByTeacher/' + window.sessionStorage.getItem('loginId') + '/' + this.imageURL + '', this.courseForm)
        window.sessionStorage.setItem('courseNO', this.courseForm.courseNO)
        console.log(res)
        if (res.code !== 200) {
          this.$message.error('添加失败！')
        }
        this.$message.success('添加成功！')
        this.courseDialogVisible = false
        this.$router.push('/uploadResource')
      })
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
      this.imageUrl = 'http://qaath1lbd.bkt.clouddn.com/' + res.key
      this.imageURL = res.key
      console.log(this.imageUrl)
    },
    beforeAvatarUpload (file) {
      this.postData.key = file.name
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>

<style scoped>
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
    margin-top: 630px;
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
