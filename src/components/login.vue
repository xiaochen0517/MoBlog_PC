<!-- login -->
<template>
  <div class="login">
    <el-row id="top">
      <el-col :span="12"></el-col>
    </el-row>
    <el-row>
      <el-col :span="8"
              :push="8"
              id="loginbox">
        <div style="text-align: center;">
          <el-radio-group v-model="labelPosition"
                          size="small">
            <el-radio-button label="login">登录</el-radio-button>
            <el-radio-button label="register">注册</el-radio-button>
          </el-radio-group>
        </div>
        <div class="grid-content bg-purple"
             v-if="labelPosition === 'login'">
          <el-row class="usernameBox">
            <el-col :span="20"
                    :push="2">
              <el-input v-model="username"
                        placeholder="用户名"></el-input>
            </el-col>
          </el-row>
          <el-row class="passwordBox">
            <el-col :span="20"
                    :push="2">
              <el-input v-model="password"
                        placeholder="密码"
                        key="login-password"
                        show-password></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10"
                    :push="2">
              <el-checkbox v-model="checked">保存密码</el-checkbox>
            </el-col>
            <el-col :span="12"
                    style="text-align: right;">
              <el-link @click="forgetPW"
                       type="primary">忘记密码</el-link>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20"
                    :push="2">
              <el-button class="submitButton"
                         type="primary"
                         @click="submit"
                         key="login-button">登录</el-button>
            </el-col>
          </el-row>
        </div>
        <div class="grid-content bg-purple"
             v-else>
          <el-row class="usernameBox">
            <el-col :span="20"
                    :push="2">
              <el-input v-model="username"
                        placeholder="用户名"></el-input>
            </el-col>
          </el-row>
          <el-row class="passwordBox">
            <el-col :span="20"
                    :push="2">
              <el-input v-model="password"
                        placeholder="密码"
                        key="reg-password"
                        show-password></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20"
                    :push="2">
              <el-input v-model="email"
                        placeholder="邮箱"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20"
                    :push="2">
              <el-input v-model="phoneNum"
                        placeholder="手机号码（选填）"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20"
                    :push="2">
              <el-button class="submitButton"
                         type="primary"
                         @click="register"
                         key="register-button">注册</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import md5 from 'js-md5'

export default {
  components: {},
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      email: '',
      phoneNum: '',
      checked: false,
      encrypt: false,
      labelPosition: 'login'
    }
  },
  computed: {
    cookieTime () {
      return new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000)
    }
  },
  watch: {
    // 用户名变化，清除密码中的内容
    username (nv, ov) {
      console.log('change')
      if (nv !== this.$Cookies.get('username')) {
        this.password = ''
        this.encrypt = false
      } else {
        this.encrypt = true
        if (this.labelPosition === 'login') {
          this.password = this.$Cookies.get('password')
        }
      }
    },
    // 切换为注册时清除密码框中的内容
    labelPosition (nv, ov) {
      if (nv === 'register') {
        // 切换为register
        this.password = ''
      } else {
        // 切换回login
        if (this.encrypt === true) {
          // 可以将cookie中的值再次赋值给password
          this.password = this.$Cookies.get('password')
        }
      }
    }
  },
  methods: {
    // 登录
    submit: function () {
      // 对输入的数据进行判断
      if (this.username.length < 1 || this.password.length < 6) {
        // 数据不合法
        this.$message({
          showClose: true,
          message: '用户名或密码输入错误！',
          type: 'error'
        })
        return
      }
      // 对密码进行加密
      var md5PW = ''
      if (this.encrypt === true) {
        md5PW = this.password
      } else {
        md5PW = md5(this.password)
      }
      // 开始登录
      var params = new URLSearchParams()
      params.append('username', this.username)
      params.append('password', md5PW)
      this.axios.post('user/login', params)
        .then(response => {
          var data = response.data
          // 判断是否登录成功
          if (data.status === 200) {
            // 登录成功，判断是否存入cookie
            if (this.checked === true) {
              this.$Cookies.set('username', this.username, { expires: this.cookieTime })
              this.$Cookies.set('password', md5PW, { expires: this.cookieTime })
            } else {
              // 删除储存的用户名密码
              this.$Cookies.set('username', '', { expires: this.cookieTime })
              this.$Cookies.set('password', '', { expires: this.cookieTime })
            }
            // 开始跳转
            this.$Cookies.set('un', this.username)
            if (data.adminstatus === true) {
              this.$Cookies.set('adminstatus', true)
            } else {
              this.$Cookies.set('adminstatus', false)
            }
            this.$router.push({ path: '/main/articlelist' })
          } else {
            // 登录失败
            console.log('login failue')
            this.$message({
              showClose: true,
              message: '用户名或密码错误！',
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          console.log(error)
          // 登录失败
          this.$message({
            showClose: true,
            message: '网络错误，请稍后重试！',
            type: 'error'
          })
        })
    },
    // 注册
    register: function () {
      var tel = ''
      // 判断数据
      if (this.username === '') {
        this.$message({
          showClose: true,
          message: '请输入用户名！',
          type: 'error'
        })
        return
      } else if (this.password === '') {
        this.$message({
          showClose: true,
          message: '请输入密码！',
          type: 'error'
        })
        return
      } else if (this.email === '') {
        this.$message({
          showClose: true,
          message: '请输入邮箱！',
          type: 'error'
        })
        return
      } else if (this.phoneNum === '') {
        tel = this.phoneNum
      } else if (this.phoneNum !== '' && this.phoneNum.length <= 5) {
        this.$message({
          showClose: true,
          message: '手机号码格式错误！',
          type: 'error'
        })
        return
      }
      // 开始发送请求
      // 对密码进行加密
      var md5PW = ''
      if (this.encrypt === true) {
        md5PW = this.password
      } else {
        md5PW = md5(this.password)
      }
      // 开始注册
      var params = new URLSearchParams()
      params.append('username', this.username)
      params.append('password', md5PW)
      params.append('email', this.email)
      params.append('phonenum', tel)
      this.axios.post('user/register', params)
        .then(response => {
          var data = response.data
          // 判断是否注册成功
          switch (data.status) {
            case 200:
              // 删除储存的用户名密码
              this.$Cookies.set('username', '', { expires: this.cookieTime })
              this.$Cookies.set('password', '', { expires: this.cookieTime })
              // 开始跳转
              this.$Cookies.set('un', this.username)
              this.$router.push({ path: '/main/articlelist' })
              break
            case 404:
              // 参数错误
              // 注册失败
              this.$message({
                showClose: true,
                message: '用户名或密码错误！',
                type: 'error'
              })
              break
            case 405:
              // 用户名重复
              this.$message({
                showClose: true,
                message: '用户名重复，请重新输入！',
                type: 'error'
              })
              break
            case 406:
              // email重复
              this.$message({
                showClose: true,
                message: 'email重复，请重新输入！',
                type: 'error'
              })
              break
            case 407:
              // num重复
              this.$message({
                showClose: true,
                message: '电话号码重复，请重新输入！',
                type: 'error'
              })
              break
            case 408:
              // 注册失败
              this.$message({
                showClose: true,
                message: '注册失败！',
                type: 'error'
              })
              break
            default:
          }
        })
        .catch(function (error) {
          console.log(error)
          // 注册失败
          this.$message({
            showClose: true,
            message: '网络错误，请稍后重试！',
            type: 'error'
          })
        })
    },
    // 忘记密码
    forgetPW: function () {
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // 判断是否保存有用户名密码
    var username = this.$Cookies.get('username')
    if (username !== undefined && username !== '') {
      // 保存有密码
      this.checked = true
      this.username = username
      this.password = this.$Cookies.get('password')
      this.encrypt = true
    }
    var un = this.$Cookies.get('un')
    if (un !== undefined && un.length > 0) {
      // 已经登录
      this.$router.push({ path: '/main/articlelist' })
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
.submitButton {
  width: 100%;
}

.el-row,
.top {
  margin-top: 30px;
}
</style>
