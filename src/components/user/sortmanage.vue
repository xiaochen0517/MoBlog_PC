<!-- sortmanage -->
<template>
  <div class="sortmanage">
    <!-- 表格 -->
    <el-table :data="sorts"
              style="width: 100%">
      <el-table-column fixed
                       type="index"
                       width="100">
      </el-table-column>
      <el-table-column prop="name"
                       label="名称">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="300">
        <template slot-scope="scope">
          <el-button @click="editUserSortClick(scope.row)"
                     type="primary"
                     size="small">编辑</el-button>
          <el-button @click="delUserSortClick(scope.row)"
                     type="danger"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 底部换页控件 -->
    <!-- <el-pagination background
                   style="margin-top: 10px;"
                   layout="prev, pager, next"
                   :total="totalSize"
                   :current-page.sync="currentPage"
                   @current-change="currentChange"
                   :hide-on-single-page="true">
    </el-pagination> -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'sortmanage',
  data () {
    return {
      sorts: [],
      newSortName: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取分类
    getSort () {
      var params = new URLSearchParams()
      params.append('username', this.$Cookies.get('un'))
      this.axios.get('user/getsort', { params: params })
        .then(response => {
          var data = response.data
          console.log(data)
          // 判断获取的数据
          if (data.status === 200) {
            // 成功获取
            this.sortStatus = false
            this.sorts = data.sorts
          } else if (data.status === 406) {
            // 获取到的sort为空
            this.sortStatus = true
          } else {
            this.$message({
              showClose: true,
              message: '获取文章分类失败！',
              type: 'error'
            })
          }
        })
        .catch(error => {
          console.log(error)
          this.$message({
            showClose: true,
            message: '获取文章分类失败！',
            type: 'error'
          })
        })
    },
    // 新建分类
    newSortClick () {
      if (this.newSortName === '' || this.newSortName.length < 1) {
        this.$message({
          showClose: true,
          message: '请输入分类名！',
          type: 'error'
        })
        return
      }
      var params = new URLSearchParams()
      params.append('username', this.$Cookies.get('un'))
      params.append('name', this.newSortName)
      this.axios.post('user/addsort', params)
        .then(response => {
          var data = response.data
          console.log(data)
          if (data.status === 200) {
            this.$message({
              showClose: true,
              message: '添加成功！',
              type: 'success'
            })
            // 刷新sort
            this.getSort()
            this.newSortName = ''
          } else {
            this.$message({
              showClose: true,
              message: '操作失败！',
              type: 'error'
            })
          }
        }).catch(error => {
          console.log(error)
          // 提交失败
          this.$message({
            showClose: true,
            message: '网络错误，请稍后重试！',
            type: 'error'
          })
        })
    },
    editUserSortClick (val) {
      console.log(val)
    },
    delUserSortClick (val) {
      console.log(val)
    }
  },
  components: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getSort()
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
