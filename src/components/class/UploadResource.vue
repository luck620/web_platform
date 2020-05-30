<template>
  <div>
    <blank-top></blank-top>
    <div class="center">
      <div class="title">
        <span class="charter">目录</span>
      </div>
      <div class="content" v-for="(item, key) in info" :item="item" :key="key">
        <h2 style="margin-left: 40px" class="week_st">{{item.weekST}}</h2>
        <li class="sub_period" style="margin-left: 80px" v-for="(subItem, subKey) in item.periodList" :item="item" :key="subKey">
          {{subItem.periodST}}
          <el-button style="margin-left: 200px;" @click="addVideo(subItem.id)" round>添加教学视频</el-button>
            <span class="span_hasUpload" v-if="subItem.videoUrl !== null" style="margin-left: 180px">该课时视频已上传 √</span>
        </li>
      </div>
      <el-button type="primary" style="margin-left: 770px;margin-top: 20px" @click="PageToHome">提交</el-button>
    </div>
    <!--修改头像-->
    <el-dialog title="上传教学视频" :visible.sync="dialogVisible" width="30%" @close="dialogVisible = false">
      <el-form :model="videoUrl" ref="imageUrlRef" label-width="80px">
        <el-upload
          class="avatar-uploader"
          :multiple="true"
          action="http://upload-z2.qiniup.com"
          :show-file-list="false"
          :data="postData"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="handleError">
          <video v-if="videoUrl" :src="videoUrl" class="avatar"></video>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          <el-progress v-if="videoFlag == true" type="circle" :percentage="videoUploadPercent" style="margin-top:30px;"></el-progress>
        </el-upload>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editVideoResource" >确 定</el-button>
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
    return {
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
    this.getInfo()
    this.getToken()
  },
  methods: {
    PageToHome () {
      this.$router.push('/classManager')
    },
    addVideo (id) {
      console.log(id)
      this.dialogVisible = true
      window.sessionStorage.setItem('periodId', id)
    },
    async editVideoResource () {
      console.log(this.videoURL)
      console.log(window.sessionStorage.getItem('periodId'))
      const { data: res } = await this.$http.get('http://localhost:8080/period/addVideoResource/' + this.videoURL + '/' + window.sessionStorage.getItem('periodId') + '')
      console.log(res)
      if (res.code !== 200) {
        this.$message.error('失败！')
      }
      this.$message.success('已上传！')
      this.dialogVisible = false
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
