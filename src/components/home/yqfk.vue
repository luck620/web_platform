<template xmlns:display="http://www.w3.org/1999/xhtml">
  <div>
    <!--活动简介-->
    <div class="container introduce">
      <div class="row">
        <div class="col-md-12 title" >
          <div class="white">
            <img src="../../assets/title_1.png" alt="">
          </div>
        </div>
        <div class="col-md-12 border">
          <p>
      “2020年年初以来，-场突如其来的新冠肺炎疫情在全国多个省(区、市)蔓延开来。在以习近平同志为核心的党中央坚强领导下，全党全军全国各族人民迅速打响了疫情防控的人民战争、总体战、阻击战。在这场特殊的战斗里，有国事、家事、天下之事，有社情、民情、人间真情。为了帮助青年学生从情感认知升华为理性思考，进一步增强打赢疫情防控阻击战的信心决心，中共北京市委教育工委、北京高校思想政治理论课高精尖创新中心、学习强国邀请首都地区名师大家，重磅推出《在经历中学习-疫情防控公开课》。”
          </p>
        </div>
        </div>
    </div>
    <!--学习课堂-->
    <div class="container review">
      <div class="row">
        <div class="col-sm-12 title">
          <img src="../../assets/title_2.png" alt>
        </div>
      </div>
      <!--内容-->
      <div class="contentInfo">
        <ul>
          <li v-for="(item, key) in yqList" :item="item" :key="key" @click="handleOpen(item.id)"><a>{{item.title}}</a></li>
        </ul>
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
      <div class="contentInfo">
        <ul>
          <li v-for="(item, key) in yqList" :item="item" :key="key" @click="handleOpen(item.id)"><a>{{item.title}}</a></li>
        </ul>
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
    </div>
  </div>
</template>

<script>
export default {
  name: 'yqfk',
  data () {
    return {
      yqList: [],
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
      }
    }
  },
  created () {
    this.getyqList()
  },
  mounted () {
    setTimeout(() => {
      console.log('dynamic change options', this.player)
      this.player.muted(false)
    }, 5000)
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    handleOpen (id) {
      this.dialogVisible = true
      this.$http.get('http://localhost:8080/theme/getyqListById/' + id + '').then((res) => {
        console.log(res)
        this.title = res.data.title
        this.playerOptions.sources[0].src = res.data.videoUrl
        this.playerOptions.poster = res.data.imageUrl
      })
    },
    handleClose () {
      this.dialogVisible = false
      // 关闭弹出框时 视频关闭播放
      this.$refs.videoPlayer.player.pause() // 暂停
    },
    async getyqList () {
      await this.$http.get('http://localhost:8080/theme/getyqList').then((res) => {
        console.log(res)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.yqList = res.data
      })
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
    }
  }
}
</script>

<style lang="less" scoped>
  .contentInfo {
    margin-left: 50px;
    float: left;
    width: 45%;
  }
  .contentInfo li {
    text-align: left;
    font-family: 华文中宋;
    font-size: 18px;
  }
  .review_content .col-md-6 {
    padding-left: 0;
    padding-right: 0;
  }
  a{
    cursor: pointer;
  }
  .review {
    margin-bottom: 90px;
    text-align: center;
    margin-top: 70px;
  }
  .introduce {
    margin-top: 70px;
    margin-bottom: 90px;
  }
  .container {
    width: 1000px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
  }
  .col-sm-12 {
    margin-bottom: 22px;
  }
  img {
    border: 0;
  }
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td, img {
    margin: 0;
    padding: 0;
  }
  img {
    vertical-align: middle;
  }
  .row {
    margin-right: -15px;
    margin-left: -15px;
  }
  .introduce .col-md-12 {
    margin-bottom: 22px;
  }
  .introduce .title {
    padding-left: 0;
    padding-right: 0;
  }
  .container .title {
    text-align: center;
    background: url(../../assets/title_bg.png) bottom center no-repeat;
  }
  .col-md-12 {
    width: 100%;
  }
  .introduce .border {
    position: relative;
    background-color: rgb(204, 51, 51);
    border-radius: 10px;
    float: left;
    padding: 30px 25px;
  }
  .introduce p {
    font-size: 14px;
    color: #fff;
    line-height: 30px;
    margin: 0 15px;
    text-indent: 2em;
  }
  p {
    padding: 0;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
    float: left;
  }
  .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
    position: relative;
    min-height: 1px;
  }
  .introduce .white {
    display: inline-block;
    padding: 0 20px;
    background-color: #fff;
  }
  .container .title {
    text-align: center;
  }
</style>
