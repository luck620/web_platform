<template>
  <div>
    <div class="wrap_body">
      <ul class="ul_tab">
        <li class="li_item">我教的课</li>
      </ul>
    </div>
    <div class="content">
      <div class="content_topRight">
        <span class="span_text" @click="dialogVisible = true">+创建课程</span>
      </div>
      <div class="content_bottom">
        <div class="course">
          aaa
        </div>
        <div class="course">
          aaa
        </div>
        <div class="course">
          aaa
        </div>
        <div class="course">
          aaa
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassManager',
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style scoped>
  .course{
    width: 250px;
    float: left;
    height: 250px;
    margin-bottom: 20px;
    margin-right: 46px;
    background-color: #9b0000;
  }
  .content_bottom{
    margin-left: 60px;
    width: 890px;
    background-color: #55a532;
  }
  .span_text{
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
