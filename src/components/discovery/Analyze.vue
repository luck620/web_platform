<template>
  <div>
    <BlankTop></BlankTop>
    <div class="wrap_body">
      <ul class="ul_tab">
        <li class="li_item">最多人选</li>
      </ul>
    </div>
    <div class="content">
      <div class="content_bottom" v-for="(item,key) in courseList" :item="item" :key="key">
        <div class="course" @click="getCourseDetail(item.id)">
          <img :src="item.imageUrl" class="img_size">
          <div class="course_content">
            <h3 class="h3_name">{{item.name}}</h3>
            <p class="p_others"> 课程号：{{item.courseNO}}</p>
            <p class="p_others" style="color: #df5000">选课人数：{{item.stuNum}}</p>
          </div>
        </div>
        </div>
  </div>
  </div>
</template>

<script>
import BlankTop from '../home/components/BlankTop'
export default {
  name: 'Analyze',
  components: { BlankTop },
  data () {
    return {
      courseList: {
        name: '',
        weekNum: '',
        periodNum: '',
        description: '',
        courseNO: ''
      },
      queryInfo: {
        pageNum: 1,
        pageSize: 6
      }
    }
  },
  created () {
    this.getCourse()
  },
  methods: {
    handleSizeChange (newSize) {
      console.log(123)
      this.queryInfo.pageSize = newSize
      this.getCourse()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getCourse()
    },
    async getCourse () {
      await this.$http.get('http://localhost:8080/course/getCourseListOrderBy/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize).then((res) => {
        console.log(res)
        this.courseList = res.data.content
        this.total = res.data.totalElements
      })
    }
  }
}
</script>

<style scoped>
  .h3_name{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .p_others{
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .course_content{
    margin-left: 10px;
  }
  .img_size{
    margin-left: 10px;
    margin-top: 5px;
    width: 250px;
    height: 169px;
  }
  .page_push{
    width: 60%;
    margin-left: 400px;
  }
  .course{
    cursor: pointer;
    width: 270px;
    float: left;
    height: 300px;
    margin-left: 20px;
    margin-bottom: 20px;
    background-color: #d6d9c7;
  }
  .content_bottom{
    margin-left: 60px;
    width: 890px;
    background-color: #55a532;
  }
  .span_text{
    cursor: pointer;
    font-size: 16px;
    color: #0099ff;
  }
  .content_topRight {
    position: absolute;
    right: 280px;
    top: 85px;
    width: 85px;
    height: 40px;
    line-height: 40px;
  }
  .content {
    margin-left: 350px;
    width: 60%;
    padding-top: 10px;
  }
  .wrap_body {
    width: 890px;
    height: auto!important;
    overflow: hidden;
    padding-top: 20px;
    position: relative;
    margin: 0 auto;
  }

  .ul_tab {
    width: 850px;
    height: 40px;
    padding-top: 12px;
    border-bottom: 2px #ccc solid;
    font-size: 20px;
    color: #777;
  }
  .li_item {
    float: left;
    width: 106px;
    height: 40px;
  }
  li {
    list-style-type: none;
    display: list-item;
    text-align: -webkit-match-parent;
  }
</style>
