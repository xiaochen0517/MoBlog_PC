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
        ID：{{userinfo.username}}
        <el-divider></el-divider>
        昵称：{{userinfo.nickname}}
        <el-link style="float: right;margin-right: 10px;"
                 type="primary"
                 @click="editNickname">修改</el-link>
        <el-divider></el-divider>
        地址：{{userinfo.address}}
        <el-link style="float: right;margin-right: 10px;"
                 type="primary"
                 @click="editAddress">修改</el-link>
        <el-divider></el-divider>
        邮箱：{{userinfo.email}}
        <el-link style="float: right;margin-right: 10px;"
                 type="primary"
                 @click="editEmail">修改</el-link>
        <el-divider></el-divider>
        电话：{{userinfo.tel}}
        <el-link style="float: right;margin-right: 10px;"
                 type="primary"
                 @click="editTel">修改</el-link>
        <el-divider></el-divider>
        介绍：{{userinfo.introduce}}
        <el-link style="float: right;margin-right: 10px;"
                 type="primary"
                 @click="editIntroduce">修改</el-link>
      </div>
    </el-card>

    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="50%"
               @close="dialogClose">
      <div>
        <el-input v-model="dialogInput"
                  :placeholder="dialogTitle"></el-input>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'userhome',
  data () {
    return {
      userinfo: {},
      dialogVisible: false,
      dialogTitle: '',
      dialogInput: ''
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
            this.userinfo = data.userinfo
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
    },
    // 提交请求方法
    postMsg (url, params) {
      this.axios.post(url, params)
        .then(response => {
          var data = response.data
          if (data.status === 200) {
            // 成功
            this.$message({
              showClose: true,
              message: '修改成功！',
              type: 'success'
            })
            this.getUserInfo()
            this.dialogVisible = false
          } else if (data.status === 406) {
            this.$message({
              showClose: true,
              message: '数据重复，请修改！',
              type: 'error'
            })
          } else {
            this.$message({
              showClose: true,
              message: '修改错误！',
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
    editNickname () {
      this.dialogTitle = '修改昵称'
      this.dialogInput = this.userinfo.nickname
      this.dialogVisible = true
    },
    editAddress () {
      this.dialogTitle = '修改地址'
      this.dialogInput = this.userinfo.address
      this.dialogVisible = true
    },
    editEmail () {
      this.dialogTitle = '修改邮箱'
      this.dialogInput = this.userinfo.email
      this.dialogVisible = true
    },
    editTel () {
      this.dialogTitle = '修改电话'
      this.dialogInput = this.userinfo.tel
      this.dialogVisible = true
    },
    editIntroduce () {
      this.dialogTitle = '修改介绍'
      this.dialogInput = this.userinfo.introduce
      this.dialogVisible = true
    },
    dialogClose () {
      this.dialogInput = ''
      this.dialogTitle = ''
    },
    submit () {
      var params = new URLSearchParams()
      if (this.userinfo.uid === undefined || this.userinfo.uid < 1) {
        // uid错误
        this.$message({
          showClose: true,
          message: 'UID错误！',
          type: 'error'
        })
        return
      }
      params.append('uid', this.userinfo.uid)
      // 检查
      if (this.dialogTitle === '修改昵称') {
        if (this.dialogInput === this.userinfo.nickname) {
          // 数据未修改
          this.$message({
            showClose: true,
            message: '请修改数据后再进行提交！',
            type: 'error'
          })
          return
        }
        params.append('nickname', this.dialogInput)
        this.postMsg('user/editnickname', params)
      } else if (this.dialogTitle === '修改地址') {
        if (this.dialogInput === this.userinfo.address) {
          // 数据未修改
          this.$message({
            showClose: true,
            message: '请修改数据后再进行提交！',
            type: 'error'
          })
          return
        }
        params.append('address', this.dialogInput)
        this.postMsg('user/editaddress', params)
      } else if (this.dialogTitle === '修改邮箱') {
        if (this.dialogInput === this.userinfo.email) {
          // 数据未修改
          this.$message({
            showClose: true,
            message: '请修改数据后再进行提交！',
            type: 'error'
          })
          return
        }
        params.append('email', this.dialogInput)
        this.postMsg('user/editemail', params)
      } else if (this.dialogTitle === '修改电话') {
        if (this.dialogInput === this.userinfo.tel) {
          // 数据未修改
          this.$message({
            showClose: true,
            message: '请修改数据后再进行提交！',
            type: 'error'
          })
          return
        }
        params.append('tel', this.dialogInput)
        this.postMsg('user/edittel', params)
      } else if (this.dialogTitle === '修改介绍') {
        if (this.dialogInput === this.userinfo.introduce) {
          // 数据未修改
          this.$message({
            showClose: true,
            message: '请修改数据后再进行提交！',
            type: 'error'
          })
          return
        }
        params.append('introduce', this.dialogInput)
        this.postMsg('user/editintroduce', params)
      } else {
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
