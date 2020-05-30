<template>
  <div>
  <BlankTop></BlankTop>
    <div class="left">
      <h3>{{notice.title}}</h3>
      <div class="sub_title">
        <span>{{notice.date}}</span>
      </div>
      <div class="h4" v-html="notice.content"></div>
      <div class="bottom" v-if="notice.wordUrl !== null">
        <a :href="notice.wordUrl"> 点此下载群公告</a>
      </div>
    </div>
  </div>
</template>

<script>
import BlankTop from '../home/components/BlankTop'
export default {
  name: 'NoticeDetail',
  components: { BlankTop },
  data () {
    return {
      notice: []
    }
  },
  created () {
    this.noticeContent()
  },
  methods: {
    async noticeContent () {
      await this.$http.get('http://localhost:8080/notice/findNoticeById/' + window.sessionStorage.getItem('noticeId') + '').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.notice = res.data
      })
    }
  }
}
</script>

<style scoped>
  .bottom{
    margin-top: 15px;
    float: right;
  }
  .main {
    width: 80%;
    padding-left: 10%;
  }
  .banner-top {
    height: 120px;
    text-align: center;
  }
  .left {
    margin-left: 400px;
    margin-top: 50px;
    display: inline-block;
    vertical-align: top;
    width: calc( 75vw - 400px)
  }
  .banner-top img {
    width: 100%;
    height: 100%;
  }
  .h4{
    font-family: 'Microsoft YaHei'!important;
    line-height: 30px;
  }
  .sub_title{
    font-size: 14px;
    font-family: 'Microsoft YaHei';
    color: #999;
    line-height: 38px;
  }
</style>
