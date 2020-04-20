<!-- introduce -->
<template>
  <div class="introduce">
    <el-card class="box-card"
             style="margin-bottom: 10px;">
      <!-- 文章标题 -->
      <el-input id="title"
                v-model="perphoto"
                style="width: 80%;"
                placeholder="请输入头部图片地址"></el-input>
      <!-- 唤起侧边栏按钮 -->
      <el-button id="pushBut"
                 type="primary"
                 style="width: 15%;margin-left: 2%;"
                 @click="submit">提交</el-button>
    </el-card>
    <!-- 个人介绍内容 -->
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
  name: 'introduce',
  data () {
    return {
      content: '',
      perphoto: ''
    }
  },
  computed: {},
  watch: {},
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
    // 获取介绍内容
    getPerMsg () {
      this.axios.get('blog/permsg')
        .then(response => {
          var data = response.data
          // 判断获取的数据
          if (data.status === 200) {
            this.perphoto = data.perphoto
            this.content = data.percontent
          } else {
            // 获取失败
            this.$message({
              showClose: true,
              message: '获取信息失败',
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
    // 提交修改后的内容
    submit () {
      // 开始提交
      var params = new URLSearchParams()
      params.append('photolink', this.perphoto)
      params.append('content', this.content)
      this.axios.post('user/editrecom', params)
        .then(response => {
          var data = response.data
          if (data.status === 200) {
            // 修改成功
            this.$message({
              showClose: true,
              message: '修改成功',
              type: 'success'
            })
            this.getPerMsg()
          } else {
            // 修改失败
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
  components: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getPerMsg()
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
