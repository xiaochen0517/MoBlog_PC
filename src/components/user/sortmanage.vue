<!-- sortmanage -->
<template>
  <div class="sortmanage">
    <!-- 添加按钮 -->
    <el-button type="primary"
               @click="addUserSortClick"
               style="margin-bottom: 10px;">添加分类</el-button>
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
    <!-- 编辑弹窗 -->
    <el-dialog :title="dialogTypeTitle"
               :visible.sync="dialogVisible"
               @close="closeDialog"
               width="40%">
      <!-- 分类名称 -->
      <el-row>
        <el-col :span="6"
                style="font-size: 16px;margin-top: 8px;margin-right: 10px;text-align: right;">
          分类名：
        </el-col>
        <el-col :span="12">
          <el-input type="text"
                    placeholder="分类名"
                    v-model="dialogSortName"
                    maxlength="10"
                    width="300px"
                    show-word-limit />
        </el-col>
      </el-row>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="confirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'sortmanage',
  data () {
    return {
      sorts: [],
      newSortName: '',
      dialogType: 1,
      dialogTypeTitle: '',
      dialogVisible: false,
      dialogSortName: '',
      dialogSortId: 0
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
    // 编辑分类名
    editUserSortClick (val) {
      console.log(val)
      this.dialogType = 2
      this.dialogTypeTitle = '编辑分类'
      this.dialogSortName = val.name
      this.dialogSortId = val.id
      this.dialogVisible = true
    },
    // 删除分类
    delUserSortClick (val) {
      console.log(val)
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams()
        params.append('id', val.id)
        this.axios.post('user/delsort', params)
          .then(response => {
            var data = response.data
            if (data.status === 200) {
              // 成功删除
              this.$message({
                showClose: true,
                message: '删除成功',
                type: 'success'
              })
              this.dialogVisible = false
              this.getSort()
            } else if (data.status === 407) {
              this.$message({
                showClose: true,
                message: '当前分类下还有文章，不可以删除该分类！',
                type: 'error'
              })
              this.dialogVisible = false
            } else {
              this.$message({
                showClose: true,
                message: '删除失败',
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加分类
    addUserSortClick () {
      this.dialogTypeTitle = '添加分类'
      this.dialogVisible = true
    },
    // 新建编辑弹窗确定按钮
    confirmClick () {
      // 判断正在进行的操作
      if (this.dialogType === 1) {
        // 添加分类
        var params = new URLSearchParams()
        params.append('username', this.$Cookies.get('un'))
        params.append('name', this.dialogSortName)
        this.axios.post('user/addsort', params)
          .then(response => {
            var data = response.data
            if (data.status === 200) {
              // 成功添加
              this.$message({
                showClose: true,
                message: '添加成功',
                type: 'success'
              })
              this.dialogVisible = false
              this.getSort()
            } else {
              this.$message({
                showClose: true,
                message: '添加失败',
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
      } else {
        // 编辑分类
        var params1 = new URLSearchParams()
        params1.append('id', this.dialogSortId)
        params1.append('name', this.dialogSortName)
        this.axios.post('user/editsort', params1)
          .then(response => {
            var data = response.data
            if (data.status === 200) {
              // 成功添加
              this.$message({
                showClose: true,
                message: '修改成功',
                type: 'success'
              })
              this.dialogVisible = false
              this.getSort()
            } else {
              this.$message({
                showClose: true,
                message: '修改失败',
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
      }
    },
    // 弹窗关闭时操作
    closeDialog () {
      this.dialogSortName = ''
      this.dialogSortId = 0
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
