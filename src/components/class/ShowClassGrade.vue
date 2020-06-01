<template>
  <div>
    <BlankTop></BlankTop>
    <h2 style="margin-left: 250px">课程成绩</h2>
<div class="content">
  <!--列表数据显示-->
  <el-table :data="gradeList" border stripe>
    <el-table-column label="序号" type="index"></el-table-column>
    <el-table-column label="姓名" prop="name"></el-table-column>
    <el-table-column label="学号" prop="sno"></el-table-column>
    <el-table-column label="手机" prop="phone"></el-table-column>
    <el-table-column label="邮箱" prop="mail"></el-table-column>
    <el-table-column label="年级" prop="grade"></el-table-column>
    <el-table-column label="分数" prop="score"></el-table-column>
  </el-table>
  <!--分页-->
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
</template>

<script>
import BlankTop from '../home/components/BlankTop'
export default {
  name: 'ShowClassGrade',
  components: { BlankTop },
  data () {
    return {
      gradeList: {},
      queryInfo: {
        pageNum: 1,
        pageSize: 10
      },
      total: 0
    }
  },
  created () {
    this.getClassGradeDetail()
  },
  methods: {
    handleSizeChange (newSize) {
      console.log(123)
      this.queryInfo.pageSize = newSize
      this.getClassGradeDetail()
    },
    handleCurrentChange (newPage) {
      this.queryInfo.pageNum = newPage
      this.getClassGradeDetail()
    },
    getClassGradeDetail () {
      console.log(window.sessionStorage.getItem('sc_courseId'))
      this.$http.get('http://localhost:8080/course/getCourseGradeDetail/' + (this.queryInfo.pageNum - 1) + '/' +
        this.queryInfo.pageSize + '/' + window.sessionStorage.getItem('sc_courseId')).then((res) => {
        console.log(res)
        this.gradeList = res.data.content
        this.total = res.data.totalElements
      })
    }
  }
}
</script>

<style scoped>
  .content{
    margin-left: 250px;
    width: 70%;
  }
</style>
