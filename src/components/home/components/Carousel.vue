<template>
    <div class="carousel-panel">
      <el-carousel height="300px" @change="change_img" ref="carousel" :autoplay="autoplay">
        <el-carousel-item v-for="(item, key) in items" :key="key" :item="item"
        >
          <img :src="item.src" alt="">
        </el-carousel-item>
      </el-carousel>
    </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    items: {}
  },
  data () {
    return {
      autoplay: true
    }
  },
  methods: {
    change_img (key) {
      this.$emit('switch_new', key)
    },
    switch_img (key) {
      this.$refs.carousel.setActiveItem(key)
      this.autoplay = false
    },
    leave () {
      this.autoplay = true
    }
  }
}
</script>

<style scoped>
  .carousel-panel {
    margin-top: 10px;
  }
  img {
    height: 300px;
    width: 400px;
  }
  .carousel-panel {
    width: 400px;
    height: 300px;
  }
</style>
