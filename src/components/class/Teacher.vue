<template>
  <div>
    <div v-if="isWhole === false">
      <!--完善信息-->
      <el-dialog title="请先完善个人信息" :visible.sync="dialogVisible" width="30%" @close="dialogClosed">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="教师号" prop="tno">
            <el-input v-model="editForm.tno"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="mail">
            <el-input v-model="editForm.mail"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input disabled v-model="editForm.phone"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editTea" >确 定</el-button>
      </span>
      </el-dialog>
    </div>
    <blank-top></blank-top>
    <div class="center">
      <div class="left_content">
        <el-menu default-active="1" class="el-menu" :collapse="isCollapse" v-model="editForm">
          <div class="user">
            <div class="headImage">
              <img :src="editForm.imageUrl" alt="" @click="headDialogVisible = true" class="avatar">
            </div>
            <p class="personalName">{{editForm.name}}</p>
            <router-link to="/userManager">
              <el-menu-item index="1" class="account">
                <span class="manageBtn">账号管理</span>
              </el-menu-item>
            </router-link>
          </div>
          <router-link to="/classManager">
            <el-menu-item index="1">
              <i class="el-icon-apple"></i>
              <span>我的课程</span>
            </el-menu-item>
          </router-link>
          <router-link to="/workManager">
            <el-menu-item index="1">
              <i class="el-icon-pear"></i>
              <span slot="title">课程测验</span>
            </el-menu-item>
          </router-link>
          <router-link to="/classGrade">
            <el-menu-item index="1">
              <i class="el-icon-wallet"></i>
              <span slot="title">班级成绩</span>
            </el-menu-item>
          </router-link>
          <router-link to="/notice">
            <el-menu-item index="1">
              <i class="el-icon-box"></i>
              <span slot="title">群公告</span>
            </el-menu-item>
          </router-link>
        </el-menu>
      </div>
      <div class="right_content">
        <router-view></router-view>
      </div>
    </div>
    <!--修改头像-->
    <el-dialog title="修改头像" :visible.sync="headDialogVisible" width="30%" @close="headDialogVisible = false">
      <el-form :model="imageUrl" ref="imageUrlRef" label-width="80px">
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
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editHead" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BlankTop from '../home/components/BlankTop'
export default {
  name: 'Teacher',
  inject: ['reload'],
  components: { BlankTop },
  data () {
    const checkEmail = (rule, value, cb) => {
      // 验证邮箱的正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        // 合法的邮箱
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    return {
      CourseDialogVisible: false,
      courseList: {
        name: '',
        imageUrl: '',
        weekNum: '',
        periodNum: '',
        description: ''
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
            message: '请输入周时',
            trigger: 'blur'
          }
        ]
      },
      postData: {
        token: '',
        key: ''
      },
      imageUrl: '',
      imageURL: '',
      headDialogVisible: false,
      isCollapse: false,
      dialogVisible: true,
      editForm: {
        name: '',
        mail: '',
        tno: '',
        phone: '',
        imageUrl: ''
      },
      editFormRules: {
        name: [
          {
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '姓名的长度在2~10个字符之间',
            trigger: 'blur'
          }
        ],
        tno: [
          {
            required: true,
            message: '请输入教师号',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 10,
            message: '教师号在2~10个字符之间',
            trigger: 'blur'
          }
        ],
        mail: [
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur'
          },
          {
            validator: checkEmail,
            trigger: 'blur'
          }
        ]
      },
      isWhole: false
    }
  },
  created () {
    this.checkInfo()
    this.showEditDialog()
    this.getToken()
  },
  methods: {
    async editHead () {
      console.log(this.imageURL)
      const { data: res } = await this.$http.get('http://localhost:8080/teacher/changeHeadById/' + window.sessionStorage.getItem('loginId') + '/' + this.imageURL + '')
      console.log(res)
      if (res.code !== 200) {
        this.$message.error('修改失败！')
      }
      this.$message.success('修改成功！')
      this.headDialogVisible = false
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
    },
    async showEditDialog () {
      const { data: res } = await this.$http.get('http://localhost:8080/teacher/findTeacherById/' + window.sessionStorage.getItem('loginId') + '')
      console.log(res)
      this.editForm = res
    },
    editTea () {
      this.$refs.editFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        const { data: res } = await this.$http.post('http://localhost:8080/teacher/consummateTeacherById/' + window.sessionStorage.getItem('loginId'), this.editForm)
        console.log(res)
        if (res.code !== 200) {
          this.$message.error('完善信息失败！')
        }
        this.$message.success('已完善信息！')
        this.dialogVisible = false
        this.reload()
      })
    },
    dialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    async checkInfo () {
      await this.$http.get('http://localhost:8080/student/checkInfo/teacher/' + window.sessionStorage.getItem('loginId') + '').then((res) => {
        console.log(res)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.isWhole = res.data
      })
    }
  }
}
</script>
<style lang="less" scoped>
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
  .manageBtn {
    display: inline-block;
    width: 74px;
    height: 26px;
    border-radius: 20px;
    background: #faa046;
    line-height: 26px;
    color: #fff;
    font-size: 14px;
  }
  .headImage{
    cursor: pointer;
    display: block;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    overflow: hidden;
    margin: 0 auto;
  }
  .personalName {
    text-align: center;
    font-size: 18px;
    height: 0px;
    line-height: 5px;
  }
  .user{
    height: 180px;
    background: url(../../assets/personalBg.jpg) no-repeat #faf7f5 bottom center;
    padding-top: 15px;
    text-align: center;
  }
  .el-menu {
    background-color: rgba(235, 238, 231, 0.85);
    height: 700px;
  }
  .el-menu-item {
    text-align: center;
    display: block;
    width: 240px;
    margin-left: 10px;
    float: left;
    color: #4c4c4c;
    font-family: "Microsoft YaHei";
    min-height: 40px;
    font-size: 18px;
    color: #4c4c4c;
  }
  .left_content{
    float: left;
    width: 21%;
  }
  .center{
    margin-left: 12%;
    width: 76%;
  }
  .right_content{
    float: right;
    width: 79%;
  }
</style>
