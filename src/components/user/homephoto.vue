<!-- homephoto -->
<template>
  <div class="homephoto">
    <el-button type="primary"
               @click="addHomePhotoClick"
               style="margin-bottom: 10px;">添加轮播图</el-button>
    <el-table :data="homePhotoData"
              style="width: 100%">
      <el-table-column fixed
                       type="index"
                       width="100">
      </el-table-column>
      <el-table-column prop="name"
                       label="名称">
      </el-table-column>
      <el-table-column prop="link"
                       label="地址"
                       width="500">
      </el-table-column>
      <el-table-column fixed="right"
                       label="操作"
                       width="200">
        <template slot-scope="scope">
          <el-button @click="editHomePhotoClick(scope.row)"
                     type="primary"
                     size="small">编辑</el-button>
          <el-button @click="delHomePhotoClick(scope.row)"
                     type="danger"
                     size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑弹窗 -->
    <el-dialog :title="dialogTypeTitle"
               :visible.sync="dialogVisible"
               @close="closeDialog"
               width="50%">
      <!-- 友链名称 -->
      <div style="margin-bottom: 10px;">
        <el-row>
          <el-col :span="6"
                  style="font-size: 16px;margin-top: 8px;margin-right: 10px;text-align: right;">
            图片名：
          </el-col>
          <el-col :span="12">
            <el-input type="text"
                      placeholder="图片名"
                      v-model="homePhotoName"
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
                      v-model="homePhotoLink"
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
  name: 'homephoto',
  data () {
    return {
      homePhotoData: [
        // {
        //   id: 1,
        //   name: 'test1',
        //   link: 'http://www.baidu.com'
        // }
      ],
      // 弹窗
      dialogVisible: false,
      dialogTypeTitle: '',
      homePhotoId: 0,
      homePhotoName: '',
      homePhotoLink: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 添加轮播图
    addHomePhotoClick () {
      // 显示弹窗
      this.dialogTypeTitle = '新增轮播图'
      this.dialogVisible = true
    },
    // 编辑轮播图
    editHomePhotoClick (row) {
      // 显示弹窗
      this.homePhotoId = row.id
      this.homePhotoName = row.name
      this.homePhotoLink = row.link
      this.dialogTypeTitle = '修改轮播图'
      this.dialogVisible = true
    },
    // 删除轮播图
    delHomePhotoClick (row) {
      var params = new URLSearchParams()
      params.append('id', row.id)
      this.axios.post('user/delhomephoto', params)
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
            this.getHomePhoto()
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
    // 提交数据
    confirmClick () {
      // 判断数据
      if (this.homePhotoName === '') {
        this.$message({
          showClose: true,
          message: '请输入图片名称！',
          type: 'error'
        })
        return
      }
      if (this.homePhotoLink === '') {
        this.$message({
          showClose: true,
          message: '请输入图片地址！',
          type: 'error'
        })
        return
      }
      // 确定操作类型
      if (this.dialogTypeTitle === '新增轮播图') {
        var params = new URLSearchParams()
        params.append('name', this.homePhotoName)
        params.append('link', this.homePhotoLink)
        this.axios.post('user/addhomephoto', params)
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
              this.getHomePhoto()
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
      } else if (this.dialogTypeTitle === '修改轮播图') {
        var paramss = new URLSearchParams()
        paramss.append('id', this.homePhotoId)
        paramss.append('name', this.homePhotoName)
        paramss.append('link', this.homePhotoLink)
        this.axios.post('user/edithomephoto', paramss)
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
              this.getHomePhoto()
              this.homePhotoId = 0
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
    },
    // 获取轮播图数据
    getHomePhoto () {
      this.axios.get('blog/homephotos')
        .then(response => {
          var data = response.data
          // 判断获取的数据
          if (data.status === 200) {
            this.homePhotoData = data.homephotos
          } else if (data.status === 404) {
            // 获取到的轮播图为0
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 弹窗关闭回调
    closeDialog () {
      this.homePhotoName = ''
      this.homePhotoLink = ''
    }
  },
  components: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // 获取图片数据
    this.getHomePhoto()
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
