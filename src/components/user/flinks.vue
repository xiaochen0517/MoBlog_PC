<!-- flinks -->
<template>
  <div class="flinks">
    <el-button type="primary"
               @click="addBlogRollClick"
               style="margin-bottom: 10px;">添加友链</el-button>
    <el-table :data="blogRollData"
              border
              style="width: 100%">
      <el-table-column fixed
                       prop="id"
                       label="ID"
                       width="100">
      </el-table-column>
      <el-table-column prop="name"
                       label="名称">
      </el-table-column>
      <el-table-column prop="link"
                       label="地址">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="200">
        <template slot-scope="scope">
          <el-button @click="editBlogRollClick(scope.row)"
                     type="primary"
                     size="small">编辑</el-button>
          <el-button @click="delBlogRollClick(scope.row)"
                     type="danger"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹窗 -->
    <el-dialog :title="dialogTypeTitle"
               :visible.sync="dialogVisible"
               width="50%">
      <!-- 友链名称 -->
      <div style="margin-bottom: 10px;">
        <el-row>
          <el-col :span="6"
                  style="font-size: 16px;margin-top: 8px;margin-right: 10px;text-align: right;">
            友链名：
          </el-col>
          <el-col :span="12">
            <el-input type="text"
                      placeholder="友链名"
                      v-model="blogRollName"
                      maxlength="8"
                      width="300px"
                      show-word-limit />
          </el-col>
        </el-row>
      </div>
      <!-- 链接 -->
      <div>
        <el-row>
          <el-col :span="6"
                  style="font-size: 16px;margin-top: 8px;margin-right: 10px;text-align: right;">
            链接地址：
          </el-col>
          <el-col :span="12">
            <el-input type="text"
                      placeholder="链接地址"
                      v-model="blogRollLink"
                      width="300px"
                      show-word-limit />
          </el-col>
        </el-row>
      </div>
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
  name: 'flinks',
  data () {
    return {
      blogRollData: [
        // {
        //   id: 1,
        //   name: 'test1',
        //   link: 'http://www.baidu.com'
        // }
      ],
      // 弹窗
      dialogVisible: false,
      dialogTypeTitle: '',
      blogRollId: 0,
      blogRollName: '',
      blogRollLink: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取友链
    getBlogRoll () {
      // 获取数据
      this.axios.get('blog/blogroll')
        .then(response => {
          var data = response.data
          // 判断获取的数据
          if (data.status === 200) {
            // 成功获取
            if (data.blogrollsize > 0) {
              this.blogRollData = data.blogrolls
            }
          } else if (data.status === 404) {
            // 获取到的友链为空
          } else {
            // 请求错误
            this.$message({
              showClose: true,
              message: '友链获取错误！',
              type: 'error'
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            showClose: true,
            message: '网络错误，请稍后重试！',
            type: 'error'
          })
        })
    },
    // 友链编辑按钮
    editBlogRollClick (row) {
      // 显示弹窗
      this.blogRollId = row.id
      this.blogRollName = row.name
      this.blogRollLink = row.link
      this.dialogTypeTitle = '修改友链'
      this.dialogVisible = true
    },
    // 新增友链按钮
    addBlogRollClick () {
      // 显示弹窗
      this.dialogTypeTitle = '新增友链'
      this.dialogVisible = true
    },
    // 友链删除按钮
    delBlogRollClick (row) {
      var params = new URLSearchParams()
      params.append('id', row.id)
      this.axios.post('user/delblogroll', params)
        .then(response => {
          var data = response.data
          if (data.status === 200) {
            // 新增成功
            this.$message({
              showClose: true,
              message: '删除成功！',
              type: 'success'
            })
            // 刷新数据
            this.getBlogRoll()
          } else {
            this.$message({
              showClose: true,
              message: '删除失败！',
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
    // 弹窗确定按钮
    confirmClick () {
      // 判断数据
      if (this.blogRollName === '') {
        this.$message({
          showClose: true,
          message: '请输入友链名称！',
          type: 'error'
        })
        return
      }
      if (this.blogRollLink === '') {
        this.$message({
          showClose: true,
          message: '请输入友链地址！',
          type: 'error'
        })
        return
      }
      // 确定操作类型
      if (this.dialogTypeTitle === '新增友链') {
        var params = new URLSearchParams()
        params.append('name', this.blogRollName)
        params.append('link', this.blogRollLink)
        this.axios.post('user/addblogroll', params)
          .then(response => {
            var data = response.data
            if (data.status === 200) {
              // 新增成功
              this.$message({
                showClose: true,
                message: '添加成功！',
                type: 'success'
              })
              // 关闭弹窗，刷新数据
              this.dialogVisible = false
              this.getBlogRoll()
              this.blogRollName = ''
              this.blogRollLink = ''
            } else {
              this.$message({
                showClose: true,
                message: '添加失败！',
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
      } else if (this.dialogTypeTitle === '修改友链') {
        var paramss = new URLSearchParams()
        paramss.append('id', this.blogRollId)
        paramss.append('name', this.blogRollName)
        paramss.append('link', this.blogRollLink)
        this.axios.post('user/editblogroll', paramss)
          .then(response => {
            var data = response.data
            if (data.status === 200) {
              // 新增成功
              this.$message({
                showClose: true,
                message: '修改成功！',
                type: 'success'
              })
              // 关闭弹窗，刷新数据
              this.dialogVisible = false
              this.getBlogRoll()
              this.blogRollId = 0
              this.blogRollName = ''
              this.blogRollLink = ''
            } else {
              this.$message({
                showClose: true,
                message: '修改失败！',
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
        // 类型判断错误
        this.$message({
          showClose: true,
          message: '类型判断错误！',
          type: 'error'
        })
      }
    }
  },
  components: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getBlogRoll()
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
