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
              <input type="text" placeholder="搜索感兴趣的资源" class="txt-search js-common-search-word"/>
              <span class="btn-search"></span>
            </div>

            <div class="mod-course-list">
              <ul class="clearfix" id="dotcon-course-item-index">
                <li class="col-md-6">
                <div class="mod-course-meta">
                <div class="course-cover">
                <img class="course-img" src="../../assets/course1.jpg" alt="">
                </div>
                <div class="course-bd">
                <h2 class="course-title">马克思主义基本原理概论</h2>
                <p class="course-introduce"> 本课程是高校思想政治理论课必修课程，包括：
                马克思主义哲学、政治经济学和科学社会主义三部
                分。其目的是帮助学生掌握马克思主义的世界观与
                方法论，树立马克思主义的人生观与价值观.....</p>
                </div>
                </div>
                </li>
                <li class="col-md-6">
                <div class="mod-course-meta">
                <div class="course-cover">
                <img class="course-img" src="../../assets/course2.jpg" alt="">
                </div>
                <div class="course-bd">
                <h2 class="course-title">毛泽东思想和中国特色社会主义理论体系概论</h2>
                <p class="course-introduce"> 本课程是高等学校思想政治理论课核心课程，以
                中国化马克思主义为主题，以马克思主义中国化为主
                线，以中国特色社会主义为重点......</p>
                </div>
                </div>
                </li>
                <li class="col-md-6">
                <div class="mod-course-meta">
                <div class="course-cover">
                <img class="course-img" src="../../assets/course3.jpg" alt="">
                </div>
                <div class="course-bd">
                <h2 class="course-title">思想道德修养与法律基础</h2>
                <p class="course-introduce"> 本课程是以马克思列宁主义、毛泽东思想、邓小
                平理论、“三个代表”重要思想和科学发展观为指导，
                以社会主义核心价值体系为主线，依据大学生成长成
                才规律，综合运用相关学科知识.....</p></div>
                </div>
                </li>
                <li class="col-md-6">
                <div class="mod-course-meta">
                <div class="course-cover">
                <img class="course-img" src="../../assets/course4.jpg" alt="">
                </div>
                <div class="course-bd">
                <h2 class="course-title">中国近现代史纲要</h2>
                <p class="course-introduce"> 本课程是高等学校思想政治理论课必修课程。按
                照时间顺序共分为从鸦片战争到五四运动前夜、从五
                四运动到新中国成立、从新中国成立到社会主义现代
                化建设新时期三篇......</p></div>
                </div>
                </li>
              </ul>
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
  name: 'BookDiscovery',
  components: { BlankTop }
}
</script>

<style scoped>
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
  }
  img {
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
    height: 144px;
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
    margin-top: 7.634855%;
    margin-bottom: 27px;
    padding-right: 10px;
    background: #fefefe;
  }
  .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
    position: relative;
    min-height: 1px;
  }
  li {
    display: list-item;
    text-align: -webkit-match-parent;
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
