<!-- mdeditor -->
<template>
  <div class="mdeditor"
       style="min-height: 100%;height: auto;">
    <!-- 侧边栏 -->
    <el-drawer title="发布文章"
               :visible.sync="drawer"
               :direction="direction"
               :before-close="handleClose">
      <!-- 内容 -->
      <div style="margin: 10px;">
        <div style="margin-top: 10px;margin-bottom: 10px;">
          <el-divider content-position="left">选择分类</el-divider>
          <span>分类：</span>
          <!-- 选择分类 -->
          <el-select v-model="chSort"
                     :disabled="sortStatus"
                     placeholder="选择分类">
            <el-option v-for="item in sorts"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
            </el-option>
          </el-select>
          <!-- 显示创建分类连接 -->
          <el-link style="margin-left: 10px;"
                   type="primary"
                   @click="newShow = !newShow">创建分类</el-link>
        </div>
        <div style="margin-top: 10px;margin-bottom: 10px;"
             v-if="newShow">
          <el-divider content-position="left">新建分类</el-divider>
          <span style="width: 20%;">分类名：</span>
          <!-- 创建分类输入框 -->
          <el-input v-model="newSortName"
                    style="width: 50%;"
                    placeholder="请输入分类名"></el-input>
          <!-- 创建分类按钮 -->
          <el-button style="width: 25%;"
                     @click="newSortClick"
                     type="primary">创建分类</el-button>
        </div>
        <div style="margin-top: 10px;margin-bottom: 10px;">
          <el-divider content-position="left">标签</el-divider>
          <span style="width: 20%;">标签：</span>
          <el-tooltip style="width: 80%;"
                      class="item"
                      effect="dark"
                      content="输入标签，以英文逗号分隔"
                      placement="top">
            <!-- 标签输入框 -->
            <el-input v-model="labelStr"
                      placeholder="请输入文章标签"></el-input>
          </el-tooltip>
        </div>
      </div>
      <div style="min-height: 100%;height: auto;">
        <!-- 发布按钮 -->
        <el-button style="width: 80%;margin-left: 10%;position: absolute;bottom: 10px;"
                   @click="commitClick"
                   type="primary">{{buttonStr}}</el-button>
      </div>
    </el-drawer>
    <el-card class="box-card"
             style="margin-bottom: 10px;">
      <!-- 文章标题 -->
      <el-input id="title"
                v-model="title"
                style="width: 80%;"
                placeholder="请输入文章标题"></el-input>
      <!-- 唤起侧边栏按钮 -->
      <el-button id="pushBut"
                 type="primary"
                 style="width: 15%;margin-left: 2%;"
                 @click="drawer = true">发布文章</el-button>
    </el-card>
    <!-- 文章内容 -->
    <mavon-editor id="md-box"
                  ref=md
                  v-model="content"
                  :ishljs="true"
                  @imgAdd="$imgAdd"
                  @imgDel="$imgDel"> </mavon-editor>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'mdeditor',
  data () {
    return {
      title: '',
      content: '',
      drawer: false,
      direction: 'rtl',
      sorts: [
        // { id: 1, name: '黄金糕' }
      ],
      chSort: '',
      sortStatus: false,
      newShow: false,
      newSortName: '',
      labelStr: '',
      type: 'publish',
      buttonStr: '发布文章'
    }
  },
  components: {
  },
  methods: {
    // 添加图片
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      console.log('test')
      var formdata = new FormData()
      formdata.append('image', $file)
      this.axios({
        url: 'user/uploadap',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then((res) => {
        var data = res.data
        console.log(data)

        if (data.status === 200) {
          this.$refs.md.$img2Url(pos, data.url)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 删除图片
    $imgDel (pos) {
      var filename = pos[0]
      var params = new URLSearchParams()
      params.append('filename', filename)
      this.axios.post('user/delap', params)
        .then(response => {
          var data = response.data
          console.log(data)
          if (data.status === 200) {
            this.$message({
              showClose: true,
              message: '删除成功！',
              type: 'success'
            })
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
    showContent () {
      console.log(this.content)
    },
    handleClose (done) {
      done()
    },
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
    // 发布文章
    publishArticle () {
      // 检查数据
      // 文章名
      if (this.title.length < 5) {
        this.$message({
          showClose: true,
          message: '文章标题不可以小于5个字符！',
          type: 'error'
        })
        return
      }
      // 文章内容
      if (this.content.length < 5) {
        this.$message({
          showClose: true,
          message: '文章内容不可以小于5个字符！',
          type: 'error'
        })
        return
      }
      // 分类
      if (this.chSort === '') {
        this.$message({
          showClose: true,
          message: '请选择分类！',
          type: 'error'
        })
        return
      }
      // 标签
      if (this.labelStr === '') {
        this.$message({
          showClose: true,
          message: '请输入标签！',
          type: 'error'
        })
        return
      }
      var params = new URLSearchParams()
      params.append('username', this.$Cookies.get('un'))
      params.append('title', this.title)
      params.append('sortid', this.chSort)
      params.append('label', this.labelStr)
      params.append('content', this.content)
      this.axios.post('user/addarticle', params)
        .then(response => {
          var data = response.data
          console.log(data)
          if (data.status === 200) {
            this.$message({
              showClose: true,
              message: '添加成功！',
              type: 'success'
            })
            // 清空侧边栏数据
            this.chSort = ''
            this.newSortName = ''
            this.labelStr = ''
            this.drawer = false
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
    // 发布编辑后的文章
    editArticle () {
      // 检查数据
      // 文章名
      if (this.title.length < 5) {
        this.$message({
          showClose: true,
          message: '文章标题不可以小于5个字符！',
          type: 'error'
        })
        return
      }
      // 文章内容
      if (this.content.length < 5) {
        this.$message({
          showClose: true,
          message: '文章内容不可以小于5个字符！',
          type: 'error'
        })
        return
      }
      // 分类
      if (this.chSort === '') {
        this.$message({
          showClose: true,
          message: '请选择分类！',
          type: 'error'
        })
        return
      }
      // 标签
      if (this.labelStr === '') {
        this.$message({
          showClose: true,
          message: '请输入标签！',
          type: 'error'
        })
        return
      }
      var params = new URLSearchParams()
      params.append('id', this.$route.params.id)
      params.append('title', this.title)
      params.append('sortid', this.chSort)
      params.append('label', this.labelStr)
      params.append('content', this.content)
      this.axios.post('user/edituserarticle', params)
        .then(response => {
          var data = response.data
          console.log(data)
          if (data.status === 200) {
            this.$message({
              showClose: true,
              message: '编辑成功！',
              type: 'success'
            })
            // 清空数据
            this.chSort = ''
            this.newSortName = ''
            this.labelStr = ''
            this.drawer = false
            this.title = ''
            this.content = ''
            // 跳转页面
            this.$router.push({
              path: `/console/myblog`
            })
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
    // 获取需要修改的文章
    getEditArticle (aid) {
      var params = new URLSearchParams()
      params.append('id', aid)
      this.axios.get('blog/article', { params: params })
        .then(response => {
          var data = response.data.article
          // 将信息隐藏
          this.returnShow = false
          // 判断获取的数据
          if (data.status === 404) {
            // 参数错误
            this.returnMsg = '参数错误，请稍后重试！'
            this.returnShow = true
          } else if (data.status === 405) {
            // 文章数据为空
            this.returnMsg = '文章获取错误，请稍后重试！'
            this.returnShow = true
          }
          this.title = data.title
          this.content = data.content
          this.labelStr = data.label
          // 判断sortid
          for (var i = 0; i < this.sorts.length; i++) {
            if (this.sorts[i].name === data.sort) {
              this.chSort = this.sorts[i].id
              break
            }
          }
        })
        .catch((error) => {
          console.log(error)
          this.returnMsg = '文章获取错误，请稍后重试！'
          this.returnShow = true
        })
    },
    commitClick () {
      // 提交按钮
      if (this.type === 'publish') {
        this.publishArticle()
      } else {
        this.editArticle()
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // 获取分类列表
    this.getSort()
    var aid = this.$route.params.id
    if (aid !== -1) {
      // 修改文章，获取文章信息
      this.getEditArticle(aid)
      this.type = 'edit'
      this.buttonStr = '完成修改'
    }
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
#md-box {
  height: 440px !important;
}
</style>
