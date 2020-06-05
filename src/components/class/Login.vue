<template>
  <div>
  <div class="blankTop">
    <blank-top></blank-top>
    <div class="banner-top">
    <span>
        <img src="http://www.bjcipt.com/zixun2.0/images/11111.png" alt="">
      </span>
    </div>
  </div>
  <div class="login_container">
    <!--中间登陆块-->
    <div class="login_box">
      <!--头像-->
      <div class="avatar_box">
        <img src="../../assets/logo.png">
      </div>
      <!--登陆表单-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
        <el-form-item label=" 手机号:" prop="phone">
          <el-input v-model="loginForm.phone" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item label=" 密码:" prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <el-form-item class="buttons">
          <span class="register" @click="dialogVisible = true">没有账号？点此注册</span>
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--注册-->
    <el-dialog title="注册" :visible.sync="dialogVisible" width="30%" @close="dialogClosed">
      <el-form :model="info" :rules="infoRules" ref="infoRef" label-width="80px">
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="info.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="info.password"></el-input>
        </el-form-item>
        <el-form-item label="注册身份" prop="type">
          <el-radio-group v-model="info.type">
            <el-radio label="teacher">教师</el-radio>
            <el-radio label="student">学生</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTeaOrStu" >确 定</el-button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import BlankTop from '../home/components/BlankTop'
export default {
  components: { BlankTop },
  inject: ['reload'],
  data () {
    const checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      isRouterAlive: true,
      info: {
        type: '',
        phone: '',
        password: ''
      },
      infoRules: {
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '密码的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ],
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请输入注册身份',
            trigger: 'change'
          }
        ]
      },
      dialogVisible: false,
      loginForm: {
        phone: '',
        password: ''
      },
      loginFormRules: {
        // 验证手机号是否合法
        phone: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            validator: checkMobile,
            trigger: 'blur'
          }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' }
        ]
      },
      phoneList: []
    }
  },
  created () {
    this.getPhoneList()
  },
  methods: {
    async getPhoneList () {
      await this.$http.get('http://localhost:8080/student/getPhoneList').then((res) => {
        console.log(res)
        this.phoneList = res.data
      })
    },
    addTeaOrStu () {
      this.$refs.infoRef.validate(async valid => {
        if (!valid) return
        let sign = 0
        for (const phone of this.phoneList) {
          if (phone === this.info.phone) {
            sign = 1
            console.log('123' + phone === this.info.phone)
            this.$message.error('该手机号已被注册！')
          }
        }
        if (sign === 0) {
          const { data: res } = await this.$http.post('http://localhost:8080/student/register', this.info)
          console.log(res)
          console.log(res.code)
          if (res.code !== 200) return this.$message.error('注册失败')
          this.$message.success('注册成功')
          this.reload()
        }
      })
    },
    dialogClosed () {
      this.$refs.infoRef.resetFields()
    },
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('http://localhost:8080/student/login', this.loginForm)
        console.log(res)
        console.log(res.code)
        window.sessionStorage.setItem('loginId', res.loginId)
        if (res.code !== 200) return this.$message.error('登录失败！用户名或密码错误')
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', res.token)
        if (res.loginType === 'student') {
          const routeData = this.$router.resolve('/student')
          window.open(routeData.href, '_blank')
        }
        if (res.loginType === 'teacher') {
          const routeData = this.$router.resolve('/teacher')
          window.open(routeData.href, '_blank')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .banner-top {
    height: 120px;
    text-align: center;
  }

  .banner-top img {
    width: 100%;
    height: 100%;
  }
  .register {
    cursor: pointer;
    margin-right: 20px;
    font-style: italic;
    text-decoration: underline;
  }
  .login_container{
    background-color: #ffffff;
    height: 100%;
  }
  .login_box{
    margin-top: 60px;
    width: 450px;
    height: 300px;
    background-color: rgba(218, 195, 238, 0.85);
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .avatar_box{
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      background-color: #fff;
      img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(238, 238, 238, 0.7);
      }
    }
  }
  .login_form{
    position: absolute;
    bottom: -20px;
    width: 100%;
    padding: 0px 30px;
    box-sizing: border-box;
  }
  .buttons{
    display: flex;
    justify-content: flex-end;
  }
</style>
