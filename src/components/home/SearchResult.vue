<template>
  <div>
    <home-template>
      <slot>
        <!--数据显示-->
        <div class="bottom-panel">
          <div v-for="(item, key) in resultList" :item="item" :key="key" class="new-item" @click='findDetailsOthers(item.id)'>
            <ul>
            <li><a>{{item.title}}</a></li>
            </ul>
          </div>
        </div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pageNum"
          :page-sizes="[20, 30 ,40, 100]"
          :page-size="queryInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </slot>
    </home-template>
  </div>
</template>

<script>
import HomeTemplate from './components/HomeTemplate'

export default {
  name: 'SearchResult',
  components: {
    HomeTemplate
  },
  data () {
    return {
      total: '',
      queryInfo: {
        pageNum: 1,
        pageSize: 20
      },
      resultList: []
    }
  },
  created () {
    this.getResults()
  },
  methods: {
    findDetailsOthers (id) {
      this.$router.push({
        name: 'NewsContent',
        query: {
          id: id
        }
      })
    },
    handleSizeChange (newSize) {
      console.log(123)
      this.queryInfo.pageSize = newSize
      this.getResults()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getResults()
    },
    async getResults () {
      await this.$http.get('http://localhost:8080/news/findAllByKeyWords/' + (this.queryInfo.pageNum - 1) + '/' + this.queryInfo.pageSize + '/' + window.sessionStorage.getItem('newsKeyWords') + '').then((res) => {
        console.log(res)
        if (res.status !== 200) return this.$message.error('获取失败')
        this.resultList = res.data.content
        this.total = res.data.totalElements
      })
    }
  }
}
</script>

<style scoped>
  .new-item {
    cursor: pointer;
  }
</style>
