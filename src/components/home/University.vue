<template>
  <div>
    <home-template>
      <slot>
        <div class="top-panel">
          <carousel :items="imgs" class="carousel" @switch_new="switch_new"
                    ref="carousel"
          ></carousel>
          <news-wrapper :items="news" class="news-wrapper"
                        ref="news_wrapper" @switch_img="switch_img" @leave="leave"
          ></news-wrapper>
        </div>
        <!--第二行-->
        <div class="two_left row">
          <div class=" high_news col-md-6 col-xs-12 col-sm-6">
            <div class="first_kuanggy">
              <div class="title_bg">
                <h2>马克思主义基本原理
                  <a href="/Category_22948/Index.aspx"><img src="/zixun2.0/images/sanjiao.png" alt=""></a>
                </h2>

              </div>
              <div class="titlexs"><a href="/Item/27890.aspx" target="_blank"><h4>马克思分配正义思想及其当代价值</h4></a></div>
              <ul>
                <li><a href="/Item/27849.aspx" target="_blank">始终坚持马克思主义哲学的科学性——黄枬森哲学思想研</a></li>
                <li><a href="/Item/27829.aspx" target="_blank">“马克思—恩格斯问题”新探</a></li>
                <li><a href="/Item/27792.aspx" target="_blank">疫情防控要善于抓住主要矛盾</a></li>
                <li><a href="/Item/27725.aspx" target="_blank">研究马克思主义要有立场有能力</a></li>
                <li><a href="/Item/27057.aspx" target="_blank">马克思主义理论应加强概念史研究</a></li>
                <li><a href="/Item/26921.aspx" target="_blank">马克思主义自然观与美好生活</a></li>
                <li><a href="/Item/26922.aspx" target="_blank">青年如何读懂马克思主义的“三美”</a></li>
              </ul>
            </div>
          </div>
          <div class="col-md-6 col-xs-12 col-sm-6">
            <div class="first_kuanggy">
              <div class="title_bg">
                <h2>马克思主义中国化
                  <a href="/Category_22949/Index.aspx"><img src="/zixun2.0/images/sanjiao.png" alt=""></a>
                </h2>

              </div>
              <div class="titlexs"><a href="/Item/27940.aspx" target="_blank"><h4>保障人民健康的中国智慧与中国方案</h4></a></div>
              <ul>
                <li><a href="/Item/27915.aspx" target="_blank">新时代青年坚定理想信念源于三维逻辑构造</a></li>
                <li><a href="/Item/27892.aspx" target="_blank">人民战争思想的新实践新发展</a></li>
                <li><a href="/Item/27894.aspx" target="_blank">为决胜全面建成小康社会提供坚强作风保证</a></li>
                <li><a href="/Item/27828.aspx" target="_blank">开辟马克思主义青年观发展新境界</a></li>
                <li><a href="/Item/27779.aspx" target="_blank">始终保持艰苦奋斗的前进姿态</a></li>
                <li><a href="/Item/27726.aspx" target="_blank">马克思恩格斯认知中国的新时代价值</a></li>
                <li><a href="/Item/27727.aspx" target="_blank">从战“疫”中学习马克思主义方法论</a></li>
              </ul>
            </div>
          </div>
        </div>
      </slot>
    </home-template>
  </div>
</template>

<script>
import Carousel from './components/Carousel'
import NewsWrapper from './components/NewsWrapper'
import HomeTemplate from './components/HomeTemplate'

export default {
  name: 'Home',
  components: {
    HomeTemplate,
    Carousel,
    NewsWrapper
  },
  data () {
    return {
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      news: [
      ],
      imgs: [],
      news_list: []
    }
  },
  created () {
    this.findAllImportantAcademic()
    this.getImages()
    this.getNewsByTypeOthers()
  },
  methods: {
    async getNewsByTypeOthers () {
      await this.$http.get('http://localhost:8080/news/findAllOthers/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize + '').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.news_list = res.data.content
      })
    },
    async getImages () {
      await this.$http.get('http://localhost:8080/news/findImagesUniversity/').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.imgs = res.data
      })
    },
    findDetailsOthers (id) {
      console.log(id)
      window.sessionStorage.setItem('newsId', id)
      this.$router.push('/findDetail')
    },
    async findAllImportantAcademic () {
      await this.$http.get('http://localhost:8080/news/findAllImportantUniversity').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.news = res.data
      })
    },
    switch_new (key) {
      this.$refs.news_wrapper.switch_new(key)
    },
    switch_img (key) {
      this.$refs.carousel.switch_img(key)
    },
    leave () {
      this.$refs.carousel.leave()
    }
  }
}
</script>

<style scoped>
  .img_wrapper img {
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
  }
  .img_wrapper img:last-child {
    margin-left: 20px !important;
  }
  .carousel {
    display: inline-block;
    vertical-align: top;
  }
  .news-wrapper {
    display: inline-block;
    vertical-align: top;
  }
  .left {
    display: inline-block;
    vertical-align: top;
    width: calc( 75vw - 400px)
  }
  .new-item {
    border-top: 1px solid #e9e9e9;
    margin-bottom: 18px;
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
  }
  .new-item h2 {
    font-size: 20px;
    color: #424242;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .new-item img {
    height: 85px;
    width: 113px;
    display: inline-block;
    vertical-align: top;
  }
  .new-item a:hover {
    text-decoration: underline;
    cursor: pointer;
  }
  .new-content {
    display: inline-block;
    vertical-align: top;
    float: right;
    width: 85%;
    color: #999;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .first_kuanggy {
    border: 1px solid #eeeeee;
    height: 310px;
    /*width: 45%;*/
    padding-left: 20px;
    margin-bottom: 20px;
  }
  .title_bg {
    height: 53px;
    padding: 0px 20px 0 0px;
  }
  .two_left .titlexs {
    padding: 20px 0 0 0;
    height: 30px;
    margin-bottom: 20px;
  }
  .row {
    margin-right: -15px;
    margin-left: -15px;
  }
  .col-sm-6 {
    width: 49%;
  }
  .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
    position: relative;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }
  div {
    display: block;
  }
  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {
    float: left;
  }
</style>
