<template>
  <div>
    <div class="wrap_body">
      <ul class="ul_tab">
        <li class="li_item">我教的课</li>
      </ul>
    </div>
    <div class="content">
      <div class="content_topRight">
        <span class="span_text" @click="CourseDialogVisible = true">+创建课程</span>
      </div>
      <div class="content_bottom">
        <div class="course">
          aaa
        </div>
        <div class="course">
          aaa
        </div>
        <div class="course">
          aaa
        </div>
        <div class="course">
          aaa
        </div>
        <div>
        </div>
      </div>
    </div>
    <!--新建课程-->
    <el-dialog title="新建课程" :visible.sync="CourseDialogVisible" width="30%" @close="CourseDialogVisible = false">
      <el-form :model="courseList" :rules="courseListRules" ref="courseListRef" label-width="80px">
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
          <el-input v-model="courseList.name"></el-input>
        </el-form-item>
        <el-form-item label="课程号" prop="courseNO">
          <el-input v-model="courseList.courseNO"></el-input>
        </el-form-item>
        <el-form-item label="周时" prop="weekNum">
          <el-input type="number" v-model="courseList.weekNum"></el-input>
        </el-form-item>
        <el-form-item label="每周课时" prop="periodNum">
          <el-input type="number" v-model="courseList.periodNum"></el-input>
        </el-form-item>
        <el-form-item label="课程描述" prop="description">
          <el-input v-model="courseList.description"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="CourseDialogVisible = false" >取 消</el-button>
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
      postData: {
        token: '',
        key: ''
      },
      imageUrl: '',
      imageURL: '',
      CourseDialogVisible: false,
      courseList: {
        name: '',
        imageUrl: '',
        weekNum: '',
        periodNum: '',
        description: '',
        courseNO: ''
      },
      courseListRules: {
        imageUrl: [
          {
            required: true,
            message: '请插入封面图',
            trigger: 'blur'
          }
        ],
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
  },
  methods: {
    async addCourse () {
      console.log(this.imageURL)
      const { data: res } = await this.$http.post('http://localhost:8080/course/addCourseByTeacher/' + window.sessionStorage.getItem('loginId') + '/' + this.imageURL + '', this.courseList)
      window.sessionStorage.setItem('courseNO', this.courseList.courseNO)
      console.log(res)
      if (res.code !== 200) {
        this.$message.error('添加失败！')
      }
      this.$message.success('添加成功！')
      this.CourseDialogVisible = false
      this.$router.push('/uploadResource')
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
    width: 250px;
    float: left;
    height: 250px;
    margin-bottom: 20px;
    margin-right: 46px;
    background-color: #9b0000;
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
