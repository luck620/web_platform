<template>
  <div>
    <blank-top></blank-top>
    <div class="mod-baner">
      <!--<img src="/static/images/banner.jpg" alt="" class="site-banner">-->
      <div class="container">
        <div class="row">
          <img src="../../assets/banner_title.png" alt="">
        </div>
      </div>
    </div>
    <div class="mod-index">
      <div class="container">

        <div class="row">

          <div class="mod-search js-common-search">
            <div class="txt-box">
              <!--<form method="get">-->
              <div class="btn-group search-sf">
              </div>
              <input type="text"  v-model="bookKeysWords" placeholder="搜索感兴趣的资源" class="txt-search js-common-search-word"/>
              <span class="btn-search" @click="searchBooks"></span>
            </div>

            <div class="mod-course-list" >
              <div class="resdetail-bd js-dot-resList" id="dot_content_resList" v-for="(item, key) in historyList" :key="key" :item="item">
                <li class="item-res item-res-book clearfix">
                  <div class="res-cover">
                    <img :src="item.imageUrl" alt="" class width="118" height="158">
                  </div>
                  <div class= "res-meta">
                    <dl class="res-meta-items">
                      <dt class="res-meta-tt">
                        <i class="res-meta-type">[图书]</i>
                        {{item.name}}
                      </dt>
                      <div>
                        <dd>
                          <span class="res-meta-key">作者: </span>
                          <em red="1">{{item.author}}</em>
                        </dd>
                        <dd>
                          <span class="res-meta-key">出版时间: </span>
                          {{item.publishTime}}
                        </dd>
                      </div>
                      <dd>
                        <span class="res -meta-key">出版机构: </span>
                        <em red="1">{{item.publish}}</em>
                      </dd>
                      <dd>
                        <span class="res-meta-key"> ISBN: </span>
                        <em red="1">{{item.isbn}}</em>
                      </dd>
                      <dd class="res-meta-describe">
                        <span class="res-meta-key">简介: </span>
                        <em red="1">
                          {{item.introduction}}</em>
                      </dd>
                    </dl>
                  </div>
                </li>
              </div>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pageNum"
                :page-sizes="[10, 20, 30 ,40, 100]"
                :page-size="queryInfo.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlankTop from '../home/components/BlankTop'
export default {
  name: 'Marxism',
  components: { BlankTop },
  data () {
    return {
      type: 'history',
      bookKeysWords: '',
      total: 0,
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      historyList: []
    }
  },
  created () {
    this.getAllBooksByType()
  },
  methods: {
    searchBooks () {
      window.sessionStorage.setItem('bookKeysWords', this.bookKeysWords)
      this.$router.push('/bookSearchResult')
    },
    async getAllBooksByType () {
      await this.$http.get('http://localhost:8080/book/findAllByType/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize + '/' + this.type + '').then((res) => {
        console.log(res)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.historyList = res.data.content
        this.total = res.data.totalElements
      })
    },
    handleSizeChange (newSize) {
      console.log(123)
      this.queryInfo.pageSize = newSize
      this.getAllBooksByType()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getAllBooksByType()
    },
    PageToMarxism () {
      this.$router.push('/marxism')
    },
    PageToMoral () {
      this.$router.push('/moral')
    },
    PageToMaoZD () {
      this.$router.push('/maoZD')
    },
    PageToHistory () {
      this.$router.push('/history')
    }
  }
}
</script>

<style scoped>
  .res-meta {
    float: right;
  }
  .res-meta-items {
    margin-top: 20px;
    text-align: left;
    float: right;
    width: 500px;
  }
  .item-res-journal dt a, .item-res-book dt a {
    color: #424242;
  }
  a, a:visited, a:hover, a:active, a:focus {
    text-decoration: none;
  }
  a {
    background-color: transparent;
    cursor: pointer;
  }
  .res-meta-type {
    margin-left: 3px;
  }
  em, i, dt {
    font-style: normal;
  }
  .item-res-journal .res-meta-describe, .item-res-book .res-meta-describe {
    margin-top: 26px;
    color: #424242;
  }
  .item-res-journal dd, .item-res-book dd {
    line-height: 30px;
    display: inline-block;
    font-size: 16px;
    margin-right: 23px;
  }
  dd {
    margin-inline-start: 40px;
  }
  dd {
    margin-left: 0;
  }
  .item-res-journal .res-meta-describe, .item-res-book .res-meta-describe {
    margin-top: 26px;
    color: #424242;
  }
  .item-res-journal dd, .item-res-book dd {
    line-height: 30px;
    display: inline-block;
    font-size: 16px;
    margin-right: 23px;
  }
  .item-res-journal dt, .item-res-book dt {
    font-size: 20px;
    line-height: 18px;
    color: #424242;
    margin-bottom: 27px;
    font-weight: 500;
  }
  .item-res-journal dd, .item-res-book dd {
    line-height: 30px;
    color: #8b8b8b;
    display: inline-block;
    font-size: 16px;
    margin-right: 23px;
  }
  .item-res {
    padding: 26px 50px 26px 28px;
    margin-bottom: 18px;
    border: 1px solid #ebd3cf;
    background: #f8ffda;
    height: 250px!important;
  }
  img {
    vertical-align: middle;
  }
  .res-cover img {
    width: 100% !important;
    height: 100% !important;
  }
  .res-meta {
    display: table;
  }
  .item-res-journal dl, .item-res-book dl {
    font-size: 0;
  }
  div, p, h1, h2, h3, h4, h5, ul, ol, dl, li {
    margin: 0;
    padding: 0;
  }
  dl {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .item-res-journal dt, .item-res-book dt {
    font-size: 18px;
    line-height: 18px;
    color: #424242;
    margin-bottom: 27px;
    font-weight: 500;
  }
  img {
    border: 0;
  }
  .res-cover {
    float: left;
    margin-top: 12px;
    margin-left: 15px;
    margin-right: 34px;
    width: 159px;
    height: 226px;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
  }
  ul, ol, li {
    list-style: none;
  }
  .resdetail-bd {
    min-height: 230px;
    margin-top: 15px;
  }
  .mod-course-list a {
    display: block;
    width: 100%;
    height: 100%;
    color: #6f6f6f;
  }
  .mod-course-meta .course-img {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  img {
    vertical-align: middle;
    border: 0;
  }
  .mod-course-meta .course-img {
    width: 100%;
    height: 100%;
    opacity: 1;
  }
  .course-bd {
    float: left;
    width: 50%;
  }
  .course-bd-in {
    background: #f3f3f3;
    height: 135px;
    overflow: hidden;
  }
  .course-title {
    color: #494949;
    font-size: 18px;
    line-height: 24px;
    margin: 9px 0 9px;
    padding-left: 11px;
  }
  .course-introduce {
    font-size: 12px;
    line-height: 21px;
    color: #a6a6a6;
    padding: 0 10px;
    text-indent: 18px;
  }
  .course-introduce a {
    display: block;
    color: #a6a6a6;
  }
  .mod-course-list a {
    width: 100%;
    height: 100%;
  }
  .mod-course-list li {
    padding: 0;
    height: 230px;
    overflow: hidden;
  }
  .col-md-6 {
    width: 50%;
  }
  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {
    float: left;
  }
  .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
    position: relative;
    min-height: 1px;
  }
  .mod-course-1 {
    padding-left: 9px;
  }
  .mod-course-2 {
    padding-right: 9px;
  }
  .mod-course-2 .course-meta-in {
    padding-top: 9px;
    background-image: url(../../assets/icon_dot1.png);
    background-repeat: no-repeat;
    background-repeat: repeat-x;
    background-position: left top;
  }
  img {
    vertical-align: middle;
  }
  img {
    border: 0;
  }
  a, a:visited, a:hover, a:active, a:focus {
    text-decoration: none;
    cursor: pointer;
    background-color: transparent;
  }
  .course-cover {
    float: left;
    width: 50%;
  }
  .mod-course-0 .course-meta-in {
    padding-right: 9px;
    background-image: url(../../assets/icon_dot1.png);
    background-repeat: repeat-y;
    background-position: right top;
  }
  .mod-course-list {
    margin-bottom: 27px;
    margin-left: 250px;
    padding-right: 10px;
    background: #fefefe;
    width: 60%;
    text-align: center;
  }
  .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
    position: relative;
    min-height: 1px;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
    cursor: pointer;
  }
  ul, ol, li {
    list-style: none;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
  }
  .mod-index {
    background-image: url(../../assets/bg_index.jpg);
    background-repeat: no-repeat;
  }
  .mod-baner {
    height: 135px;
    border-bottom: 4px solid #9b0000;
    background-image: url(../../assets/banner.jpg);
    background-repeat: no-repeat;
  }
  .row {
    margin-left: -15px;
    margin-right: -15px;
  }
  .container {
    min-width: auto;
    width: 1205px;
    margin-right: auto;
    margin-left: auto;
    padding-left: 15px;
    padding-top: 40px;
    padding-right: 15px;
  }
  .txt-box {
    width: 598px;
    border-radius: 2px;
    margin: 8.547718% auto 19px;
    border: none;
    background: transparent;
    position: relative;
  }
  dn {
    display: none;
  }
  label {
    font-weight: normal;
    max-width: 100%;
    margin-bottom: 5px;
  }
  .mod-search-bar .search-sf, .mod-search .search-sf {
    right: -60px;
    cursor: pointer;
    line-height: 40px;
  }
  .btn-group, .btn-group-vertical {
    position: relative;
    display: inline-block;
    vertical-align: middle;
  }
  .mod-search-bar .search-sf .dropdown-toggle, .mod-search .search-sf .dropdown-toggle {
    font-size: 16px;
    color: #555555;
  }
  .dropdown-toggle {
    position: relative;
    z-index: 2;
  }
  .mod-search-bar .search-sf, .mod-search .search-sf {
    right: -60px;
    cursor: pointer;
    line-height: 40px;
  }
  .mod-search-bar .search-sf label, .mod-search .search-sf label {
    cursor: pointer;
  }
  label {
    font-weight: normal;
  }
  label {
    display: inline-block;
    max-width: 100%;
    margin-bottom: 5px;
  }
  .caret {
    transition: all .2s ease-out;
  }
  .caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 2px;
    vertical-align: middle;
    border-top: 4px dashed;
    border-top: 4px solid \9;
    border-right: 4px solid transparent;
    border-left: 4px solid transparent;
  }
  em, i, dt {
    font-style: normal;
  }
  .mod-search-bar .txt-search, .mod-search .txt-search {
    padding-left: 70px;
  }
  .txt-search {
    width: 503px;
    padding: 11px 40px 11px 20px;
    background: #ffffff;
    border: 1px solid #c2c2c2;
    border-radius: 4px 0 0 4px;
    font-size: 16px;
    color: #555555;
  }
  input, button, select, textarea {
    font-family: inherit;
    line-height: inherit;
  }
  button, input, optgroup, select, textarea {
    font: inherit;
    margin: 0;
  }
  input {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: textfield;
    -webkit-rtl-ordering: logical;
    cursor: text;
  }
  .btn-search {
    background-image: url(../../assets/btn_search_index.png);
    background-repeat: no-repeat;
  }
  .btn-search {
    width: 75px;
    height: 46px;
    position: absolute;
    top: 0;
    right: 20px;
  }
  .btn-search {
    width: 75px;
    height: 46px;
    position: absolute;
    top: 22px;
    right: -18px;
    display: inline-block;
    cursor: pointer;
    background-repeat: no-repeat;
  }
  .txt-hot {
    text-align: center;
    color: #999898;
  }
</style>
