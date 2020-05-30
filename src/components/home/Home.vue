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
          <div class="bottom-panel" v-if="Object.keys(news_list).length!==0">
            <div v-for="(item, key) in news_list" :item="item" :key="key" class="new-item" @click='findDetailsOthers(item.id)'>
              <h2><a>{{item.title}}</a></h2>
              <div>
                <img :src="item.imageUrl" alt="">
                <div class="new-content" v-html="item.content"></div>
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
      key: '',
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
    this.getNewsByTypeImportant()
    this.getNewsByTypeOthers()
    this.getImages()
  },
  methods: {
    handletab (key) {
      console.log('test', key)
      this.key = key
    },
    findDetailsOthers (id) {
      this.$router.push({
        name: 'NewsContent',
        query: {
          id: id
        }
      })
    },
    getImages () {
      this.$http.get('http://localhost:8080/news/findImages/').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.imgs = res.data
      })
    },
    getNewsByTypeImportant () {
      this.$http.get('http://localhost:8080/news/findAllImportant/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize + '').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.news = res.data.content
      })
    },
    getNewsByTypeOthers () {
      console.log(new Date().getTime())
      this.$http.get('http://localhost:8080/news/findAllOthers/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize + '').then((res) => {
        console.log(res.data)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.news_list = res.data.content
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
  .main {
    width: 80%;
    padding-left: 10%;
  }
  .banner-top {
    height: 120px;
    text-align: center;
  }

  .banner-top img {
    width: 100%;
    height: 100%;
  }

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
</style>
