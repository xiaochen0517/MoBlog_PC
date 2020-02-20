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
        <div class="grid-content bg-purple">
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
                        placeholder="密码"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="22"
                    :push="2">
              <el-checkbox v-model="checked">保存密码</el-checkbox>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20"
                    :push="2">
              <el-button class="submitButton"
                         type="primary"
                         @click="submit">登录</el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  components: {},
  name: 'login',
  data () {
    return {
      username: '張三',
      password: '123456',
      checked: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    submit: function () {
      var params = new URLSearchParams()
      params.append('username', this.username)
      params.append('password', this.password)
      axios.post('http://127.0.0.1:8080/moblog/test/login', params)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
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
