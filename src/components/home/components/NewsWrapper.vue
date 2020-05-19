<template>
  <div class="news-wrapper">
    <div v-for="(item, key) in items" :item="item" :key="key" class="news-item"
      :class="{active: is_active(key)}" @mouseenter="enter(key)" @mouseleave="leave" @click="findDetail(item.id)"
    >
      <h2>{{item.title}}</h2>
      <p v-html="item.content">{{item.content}}</p>
    </div>
    <h2></h2>
  </div>
</template>

<script>
export default {
  name: 'NewsWrapper',
  props: {
    items: {}
  },
  data () {
    return {
      active_num: 0
    }
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
    is_active (key) {
      return key === this.active_num
    },
    switch_new (key) {
      this.active_num = key
    },
    enter (key) {
      this.$emit('switch_img', key)
    },
    leave () {
      this.$emit('leave')
    }
  }
}
</script>

<style scoped>
  .news-wrapper {
    display: inline-block;
    margin-left: 20px;
  }
  .news-item {
    width: 460px;
    height: 105px;
    border-top: 1px solid #fff;
    cursor: pointer;
    text-align: left;
    margin-left: -5px;
    position: relative;
  }
  .active {
    background-color: #f5f5f5;
  }
  h2 {
    padding: 0 20px;
    font-weight: bold;
    font-size: 18px!important;
    color: #424242;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .news-item p {
    font-size: 14px!important;
    color: #bababa;
    line-height: 24px;
    padding: 0 20px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
</style>
