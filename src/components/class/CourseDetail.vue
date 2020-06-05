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
          <el-button style="margin-left: 200px;" round @click="handleOpen(subItem.id)">观看该课时</el-button>
        </li>
      </div>
    </div>
    <el-dialog title="视频详情" width="40%" :visible="dialogVisible" @close="dialogVisible" :before-close="handleClose">
      <video-player  class="vjs-custom-skin"
                     ref="videoPlayer"
                     :options="playerOptions"
                     :playsinline="true"
                     @play="onPlayerPlay($event)"
                     @pause="onPlayerPause($event)"
                     @ended="onPlayerEnded($event)"
                     @loadeddata="onPlayerLoadeddata($event)"
                     @waiting="onPlayerWaiting($event)"
                     @playing="onPlayerPlaying($event)"
                     @timeupdate="onPlayerTimeupdate($event)"
                     @canplay="onPlayerCanplay($event)"
                     @canplaythrough="onPlayerCanplaythrough($event)"
                     @statechanged="playerStateChanged($event)">
      </video-player>
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
      dialogVisible: false,
      videoUrl: '',
      imageUrl: '',
      title: '',
      playerOptions: {
        height: '360',
        autoplay: false,
        muted: true,
        preload: 'auto',
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: ''
        }],
        poster: ''
      },
      info: []
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    handleOpen (id) {
      this.dialogVisible = true
      this.$http.get('http://localhost:8080/period/getPeriodById/' + id + '').then((res) => {
        console.log(res)
        this.playerOptions.sources[0].src = res.data.videoUrl
      })
    },
    handleClose () {
      this.dialogVisible = false
      // 关闭弹出框时 视频关闭播放
      this.$refs.videoPlayer.player.pause() // 暂停
    },
    onPlayerPlay (player) {
      // console.log('player play!', player)
    },
    onPlayerPause (player) {
      // console.log('player pause!', player)
    },
    onPlayerEnded (player) {
      player.end()
      console.log('player ended!', player)
    },
    onPlayerLoadeddata (player) {
      // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting (player) {
      // console.log('player Waiting!', player)
    },
    onPlayerPlaying (player) {
      // console.log('player Playing!', player)
    },
    onPlayerTimeupdate (player) {
      // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay (player) {
      // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough (player) {
      // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged (playerCurrentState) {
      // console.log('player current update state', playerCurrentState)
    },
    async getInfo () {
      console.log(window.sessionStorage.getItem('courseDetailId'))
      await this.$http.get('http://localhost:8080/period/getInfo/' + window.sessionStorage.getItem('courseDetailId') + '').then((res) => {
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
