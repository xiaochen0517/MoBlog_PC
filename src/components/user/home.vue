<!-- userhome -->
<template>
  <div class="userhome">
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>用户信息</span>
        <el-button style="float: right;padding: 3px 0px"
                   type="text"
                   @click="logout">注销</el-button>
      </div>
      <div>
        <p>昵称：{{nickName}}</p>
        <el-divider></el-divider>
        <p>地址：{{address}}</p>
        <el-divider></el-divider>
        <p>邮箱：{{email}}</p>
        <el-divider></el-divider>
        <p>电话：{{tel}}</p>
        <el-divider></el-divider>
        <p>介绍：{{recommend}}</p>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'userhome',
  data () {
    return {
      nickName: '',
      address: '',
      email: '',
      tel: '',
      recommend: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    logout () {
      this.axios.post('user/logout')
        .then(response => {
          var data = response.data
          if (data.status === 200) {
            // 成功注销
            this.$message({
              showClose: true,
              message: '成功注销！',
              type: 'success'
            })
            this.$router.push({ path: '/main/articlelist' })
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
    // 获取用户信息
    getUserInfo () {
      this.axios.get('user/getuserinfo')
        .then(response => {
          var data = response.data
          if (data.status === 200) {
            // 获取数据成功
            var userinfo = data.userinfo
            this.nickName = userinfo.nickname
            this.address = userinfo.address
            this.email = userinfo.email
            this.tel = userinfo.tel
            this.recommend = userinfo.introduce
          } else {
            this.$message({
              showClose: true,
              message: '获取用户信息失败！',
              type: 'error'
            })
          }
        })
        .catch(error => {
          console.log(error)
          this.$message({
            showClose: true,
            message: '网络连接错误，请稍后重试！',
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
    // 获取用户信息
    this.getUserInfo()
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
