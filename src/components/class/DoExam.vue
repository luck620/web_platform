<template>
  <div>
    <blank-top></blank-top>
    <div v-if="this.score !== ''" style="margin-top: 100px;margin-left: 200px">
      <h2>该测验已完成！</h2>
      <h2>您的分数：{{this.score}}</h2>
    </div>
    <div v-if="this.score == ''">
    <div class="center">
      <div class="title">
        <span class="charter">开始考试</span>
      </div>
      <div class="content" v-for="(item, key) in examList" :item="item" :key="key">
        <div v-if="item.title !== null">
        <span style="margin-left: 40px" class="week_st">{{key+1}}.{{item.title}}</span>
        <div style="color: #df5000;margin-left: 50px;margin-top: 20px">
          <el-radio-group v-model="item.choose">
          <div v-if="item.chooseA !== null" style="margin-bottom: 5px;margin-left: 25px">
            <el-radio label="A">A：{{item.chooseA}}</el-radio></div>
          <div v-if="item.chooseB !== null" style="margin-bottom: 5px;margin-left: 25px"><el-radio label="B">B：{{item.chooseB}}</el-radio></div>
          <div v-if="item.chooseC !== null" style="margin-bottom: 5px;margin-left: 25px"><el-radio label="C">C：{{item.chooseC}}</el-radio></div>
          <div v-if="item.chooseD !== null" style="margin-bottom: 5px;margin-left: 25px"><el-radio label="D">D：{{item.chooseD}}</el-radio></div>
          </el-radio-group>
        </div>
        </div>
      </div>
      <el-button type="primary" style="margin-left: 770px;margin-top: 20px" @click="PageToHome">提交</el-button>
    </div>
    </div>
  </div>
</template>

<script>
import BlankTop from '../home/components/BlankTop'
export default {
  name: 'Teacher',
  inject: ['reload'],
  components: { BlankTop },
  data () {
    return {
      score: '',
      radio: 1,
      examUpdateForm: {
        title: '',
        chooseA: '',
        chooseB: '',
        chooseC: '',
        chooseD: '',
        answer: '',
        content: ''
      },
      examUpdateFormRules: {
        title: [
          { required: true, message: '请输入题目', trigger: 'blur' }
        ],
        chooseA: [
          { required: true, message: '请输入选项A', trigger: 'blur' }
        ],
        chooseB: [
          { required: true, message: '请输入选项B', trigger: 'blur' }
        ],
        chooseC: [
          { required: true, message: '请输入选项C', trigger: 'blur' }
        ],
        chooseD: [
          { required: true, message: '请输入选项D', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入正确答案', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入解析', trigger: 'blur' }
        ]
      },
      options: ['A', 'B', 'C', 'D'],
      examList: [],
      videoFlag: ' ',
      videoUploadPercent: '',
      postData: {
        token: '',
        key: ''
      },
      videoUrl: '',
      videoURL: '',
      dialogVisible: false,
      info: []
    }
  },
  created () {
    this.getExam()
    this.getScore()
  },
  methods: {
    async getExam () {
      const { data: res } = await this.$http.get('http://localhost:8080/exam/getExam/' + window.sessionStorage.getItem('courseId_exam') + '')
      console.log(res)
      this.examList = res
      for (var item in this.examList) {
        this.$set(this.examList[item], 'choose', '')
      }
      console.log('test', this.examList)
    },
    async getScore () {
      const { data: res } = await this.$http.get('http://localhost:8080/exam/hasScore/' + window.sessionStorage.getItem('loginId') + '/' + window.sessionStorage.getItem('courseId_exam'))
      console.log(res)
      this.score = res
    },
    async PageToHome () {
      window.sessionStorage.getItem('courseId,exam')
      const chooseList = {}
      for (var item in this.examList) {
        this.$set(chooseList, this.examList[item].id, this.examList[item].choose)
      }
      console.log(chooseList)
      const { data: res } = await this.$http.post('http://localhost:8080/exam/submitAnswer/' + window.sessionStorage.getItem('loginId') + '/' + window.sessionStorage.getItem('courseId_exam'), chooseList)
      console.log(res)
      this.$router.push('/studentWorkManager')
    },
    addExam (id) {
      console.log(id)
      this.dialogVisible = true
      window.sessionStorage.setItem('examId', id)
    },
    async updateExam () {
      this.$refs.examUpdateFormRef.validate(async valid => {
        if (!valid) return
        console.log(this.examUpdateForm.answer)
        const { data: res } = await this.$http.post('http://localhost:8080/exam/updateExamInfo/' + window.sessionStorage.getItem('examId') + '', this.examUpdateForm)
        console.log(res)
        if (res.code !== 200) {
          this.$message.error('失败！')
        }
        this.$message.success('已上传！')
        this.dialogVisible = false
        this.reload()
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
      this.videoUrl = 'http://qaath1lbd.bkt.clouddn.com/' + res.key
      this.videoURL = res.key
      console.log(this.videoUrl)
    },
    beforeAvatarUpload (file) {
      this.postData.key = file.name
      const isLt1000M = file.size / 1024 / 1024 < 1000
      if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb'].indexOf(file.type) === -1) {
        this.$message.error('请上传正确的视频格式')
        return false
      }
      if (!isLt1000M) {
        this.$message.error('上传视频大小不能超过1000MB哦!')
        return false
      }
    },
    async getInfo () {
      console.log(window.sessionStorage.getItem('courseNO'))
      await this.$http.get('http://localhost:8080/course/getInfo/' + window.sessionStorage.getItem('courseNO') + '').then((res) => {
        console.log(res)
        console.log(res.data)
        this.info = res.data
      })
    },
    dialogClosed () {
      this.$refs.editFormRef.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
  .span_hasUpload{
    font-style: italic;
    font-family: 黑体;
    color: #df5000;
  }
  .sub_period{
    margin-left: 80px;
    margin-top: 10px;
  }
  .week_st{
    font-size: 16px;
    font-weight: normal;
    height: 28px;
    line-height: 28px;
    margin-bottom: 10px;
    color: #000;
  }
  .charter{
    float: left;
    font-size: 20px;
    color: #333;
    margin-left: 20px;
  }
  .content{
    border-top: 1px #fff solid;
    border: 1px solid #ddd;
    padding-bottom: 30px;
    padding-top: 15px;
  }
  .title{
    border: 1px solid #d7d7d7;
    border-bottom-width: 1px;
    height: 40px;
    padding-top: 10px;
    padding-bottom: 3px;
    border-radius: 5px 5px 0px 0px;
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
    margin-left: 25%;
    width: 50%;
    margin-top: 30px;
  }
  .right_content{
    float: right;
    width: 79%;
  }
</style>
