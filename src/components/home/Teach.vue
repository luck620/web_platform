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
          <div class="left_box">
            <div class="first_kuanggy">
              <div class="title_bg">
                <h2>教学管理</h2>
              </div>
              <ul>
                <li  v-for="(item, key) in teach_list1" :item="item" :key="key" @click="findDetail(item.id)"><a>{{item.title}}</a></li>
              </ul>
            </div>
          </div>
          <div class="right_box">
            <div class="first_kuanggy">
              <div class="title_bg">
                <h2>教学改革</h2>

              </div>
              <ul>
                <li  v-for="(item, key) in teach_list2" :item="item" :key="key" @click="findDetail(item.id)"><a>{{item.title}}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <!--第三行-->
        <div class="two_left row">
          <div class="left_box">
            <div class="first_kuanggy">
              <div class="title_bg">
                <h2>理论教学</h2>

              </div>
              <ul>
                <li  v-for="(item, key) in teach_list3" :item="item" :key="key" @click="findDetail(item.id)"><a>{{item.title}}</a></li>
              </ul>
            </div>
          </div>
          <div class="right_box">
            <div class="first_kuanggy">
              <div class="title_bg">
                <h2>实践教学</h2>
              </div>
              <ul>
                <li  v-for="(item, key) in teach_list4" :item="item" :key="key" @click="findDetail(item.id)"><a>{{item.title}}</a></li>
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
      news_list: [],
      type1: '教学管理',
      type2: '教学改革',
      type3: '理论教学',
      type4: '实践教学',
      teach_list1: [],
      teach_list2: [],
      teach_list3: [],
      teach_list4: []
    }
  },
  created () {
    this.findAllImportantAcademic()
    this.getImages()
    this.getNewsByTypeOthers()
    this.findTeachByType1()
    this.findTeachByType2()
    this.findTeachByType3()
    this.findTeachByType4()
  },
  methods: {
    findDetail (id) {
      console.log(id)
      window.sessionStorage.setItem('newsId', id)
      this.$router.push({
        path: '/findDetail',
        query: {
          id: id
        }
      })
    },
    async findTeachByType1 () {
      await this.$http.get('http://localhost:8080/news/findTeachByType/' + this.type1 + '').then((res) => {
        console.log(res)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.teach_list1 = res.data
      })
    },
    async findTeachByType2 () {
      await this.$http.get('http://localhost:8080/news/findTeachByType/' + this.type2 + '').then((res) => {
        console.log(res)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.teach_list2 = res.data
      })
    },
    async findTeachByType3 () {
      await this.$http.get('http://localhost:8080/news/findTeachByType/' + this.type3 + '').then((res) => {
        console.log(res)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.teach_list3 = res.data
      })
    },
    async findTeachByType4 () {
      await this.$http.get('http://localhost:8080/news/findTeachByType/' + this.type4 + '').then((res) => {
        console.log(res)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.teach_list4 = res.data
      })
    },
    async getNewsByTypeOthers () {
      await this.$http.get('http://localhost:8080/news/findAllOthers/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize + '').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.news_list = res.data.content
      })
    },
    async getImages () {
      await this.$http.get('http://localhost:8080/news/findImagesTeach/').then((res) => {
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
      await this.$http.get('http://localhost:8080/news/findAllImportantTeach').then((res) => {
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
    height: 20px;
    padding: 0px 0 48px 0px;
  }
  .title_bg h2 {
    font-size: 22px;
    color: #c01920;
    line-height: 53px;
    border-bottom: 1px solid #eee;
    font-weight: 700;
    font-family: 'Microsoft YaHei';
  }
  .two_left .titlexs {
    padding: 20px 0 0 0;
    height: 30px;
    margin-bottom: 20px;
  }
  .two_left .titlexs h4 {
    font-size: 16px;
    color: #424242;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .two_left ul li {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 30px;
    display: flex;
    align-items: center;
    font: normal normal normal 14px/30px "Microsoft YaHei";
    color: #424242;
  }
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  li {
    text-align: -webkit-match-parent;
    cursor: pointer;
    text-decoration:underline
  }
  .two_left ul li a {
    display: inline-block;
    width: 100%;
    color: #424242;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .row {
    margin-right: -15px;
    margin-left: -15px;
  }
  div {
    display: block;
  }
  .left_box{
    float: left;
    width: 48%;
    min-height: 1px;
    padding-right: 15px;
    padding-left: 15px;
  }
  .right_box{
    float: right;
    width: 48%;
    min-height: 1px;
  }
</style>
