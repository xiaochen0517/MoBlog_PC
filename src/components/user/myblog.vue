<!-- myblog -->
<template>
  <div class="myblog">
    <!-- 表格 -->
    <el-table :data="UserArticleData"
              style="width: 100%">
      <el-table-column fixed
                       type="index"
                       width="100">
      </el-table-column>
      <el-table-column prop="title"
                       label="标题">
      </el-table-column>
      <el-table-column prop="sort"
                       label="分类">
      </el-table-column>
      <el-table-column prop="publisht"
                       label="发布时间">
      </el-table-column>
      <el-table-column prop="status"
                       label="状态">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="200">
        <template slot-scope="scope">
          <el-button @click="editUserArticleClick(scope.row)"
                     type="primary"
                     size="small">编辑</el-button>
          <el-button @click="delUserArticleClick(scope.row)"
                     type="danger"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部换页控件 -->
    <el-pagination background
                   style="margin-top: 10px;"
                   layout="prev, pager, next"
                   :total="totalSize"
                   :current-page.sync="currentPage"
                   @current-change="currentChange"
                   :hide-on-single-page="true">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'myblog',
  data () {
    return {
      UserArticleData: [],
      totalSize: 0,
      currentPage: 0
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取用户文章列表
    getMyArticleList (page) {
      // 获取用户文章列表
      var params = new URLSearchParams()
      params.append('page', page)
      this.axios.get('user/getuserarticle', { params: params })
        .then(response => {
          var data = response.data
          if (data.status === 200) {
            // 获取成功
            if (data.articlesize === 0) {
              // 文章数为0
            } else {
              var articlelist = data.articlelist
              for (var i = 0; i < articlelist.length; i++) {
                if (articlelist[i].status === true) {
                  articlelist[i].status = '已发布'
                } else {
                  articlelist[i].status = '未审核'
                }
              }
              this.UserArticleData = articlelist
              this.totalSize = data.articlesize
              console.log(data.articlelist)
            }
          } else {
            // 获取失败
            this.$message({
              showClose: true,
              message: '文章获取失败，请稍后重试！',
              type: 'error'
            })
          }
        })
        .catch(error => {
          console.log(error)
          this.$message({
            showClose: true,
            message: '网络错误，请稍后重试！',
            type: 'error'
          })
        })
    },
    editUserArticleClick (val) {
      console.log(val)
      this.$router.push({
        path: `/console/mdeditor/${val.id}`
      })
    },
    delUserArticleClick (val) {
      console.log(val)
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams()
        params.append('id', val.id)
        this.axios.post('user/deluserarticle', params)
          .then(response => {
            var data = response.data
            if (data.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getMyArticleList(this.currentPage)
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          })
          .catch(error => {
            console.log(error)
            this.$message({
              type: 'error',
              message: '网络错误，请稍后重试!'
            })
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    currentChange () {
      this.getMyArticleList(this.currentPage)
    }
  },
  components: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getMyArticleList(1)
  },
  // 生命周期 - 创建之前
  beforeCreate () { },
  // 生命周期 - 挂载之前
  beforeMount () { },
  // 生命周期 - 更新之前
  beforeUpdate () { },
  // 生命周期 - 更新之后
  updated () { },
  // 生命周期 - 销毁之前
  beforeDestroy () { },
  // 生命周期 - 销毁完成
  destroyed () { },
  // 如果页面有keep-alive缓存功能，这个函数会触发
  activated () { }
}
</script>

<style scoped>
</style>
