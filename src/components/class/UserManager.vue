<template>
  <div :v-model="this.editForm">
    <h3 class="h3">基本资料</h3>
    <div class="set_list">
      <ul>
        <li class="set_name"><p class="p_name">姓名：</p></li>
        <li class="set_name">
          <div class="organization">
          <span>{{editForm.name}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="set_list">
      <ul>
        <li class="set_name"><p>教师号：</p></li>
        <li class="set_name">
          <div class="organization">
            <span>{{editForm.tno}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="set_list">
      <ul>
        <li class="set_name"><p>手机号：</p></li>
        <li class="set_name">
          <div class="organization">
            <span>{{editForm.phone}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="set_list">
      <ul>
        <li class="set_name"><p class="p_mail">邮箱：</p></li>
        <li class="set_name">
          <div class="organization">
            <span>{{editForm.mail}}</span>
          </div>
        </li>
      </ul>
    </div>
    <el-button class="quit_btn" type="danger" @click="showEditDialog">修改</el-button>
    <el-button class="quit_btn" type="info" @click="logout">退出</el-button>
    <!--修改信息-->
    <el-dialog title="修改个人信息" :visible.sync="dialogVisible" width="30%" @close="dialogClosed">
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
</template>

<script>
export default {
  name: 'UserManager',
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
      dialogVisible: false,
      editForm: {
        name: '',
        mail: '',
        tno: '',
        phone: ''
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
      }
    }
  },
  created () {
    this.showInfo()
  },
  methods: {
    editTea () {
      this.$refs.editFormRef.validate(async valid => {
        console.log(valid)
        if (!valid) return
        const { data: res } = await this.$http.post('http://localhost:8080/teacher/consummateTeacherById/' + window.sessionStorage.getItem('loginId'), this.editForm)
        console.log(res)
        if (res.code !== 200) {
          this.$message.error('更新教师信息失败！')
        }
        this.$message.success('更新教师信息成功！')
        this.dialogVisible = false
        this.showInfo()
      })
    },
    dialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    logout () {
      // 清空token
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async showInfo () {
      const { data: res } = await this.$http.get('http://localhost:8080/teacher/findTeacherById/' + window.sessionStorage.getItem('loginId') + '')
      console.log(res)
      this.editForm = res
    },
    async showEditDialog () {
      const { data: res } = await this.$http.get('http://localhost:8080/teacher/findTeacherById/' + window.sessionStorage.getItem('loginId') + '')
      console.log(res)
      this.editForm = res
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
  .p_name{
    margin-left: 14px;
  }
  .p_mail{
    margin-left: 14px;
  }
  .quit_btn{
    margin-top: 20px;
    margin-left: 850px;
  }
  .set_list li {
    display: inline-block;
    vertical-align: middle;
  }
  .set_list .organization span {
    font-size: 14px;
    color: #999999;
    line-height: 15px;
  }
  li {
    list-style: none;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }
  .set_list {
    border-bottom: 1px dashed #CCCCCC;
    margin-top: 15px;
    padding-bottom: 15px;
  }
  .h3{
    margin-left: 5px;
    font-size: 24px;
    font-weight: normal;
    padding-bottom: 15px;
    border-bottom: 1px solid #bbbbbb;
    height: 25px;
    line-height: 40px;
  }
</style>
