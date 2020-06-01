<!-- homemsg -->
<template>
  <div class="homemsg">
    <el-row>
      <el-col :span="18">
        <el-input v-model="records"></el-input>
      </el-col>
      <el-col :span="3"
              :offset="2">
        <el-button type="primary"
                   @click="commitRecords">提交备案号</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'homemsg',
  data () {
    return {
      records: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取友链
    getRecords () {
      // 获取数据
      this.axios.get('blog/records')
        .then(response => {
          var data = response.data
          // 判断获取的数据
          if (data.status === 200) {
            // 成功获取
            this.records = data.records
          } else if (data.status === 404) {
            // 获取到的友链为空
          } else {
            // 请求错误
            this.$message({
              showClose: true,
              message: '备案号获取错误！',
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
    // 提交备案号
    commitRecords () {
      if (this.records === '') {
        this.$message({
          showClose: true,
          message: '备案号不可为空！',
          type: 'error'
        })
      }
      var params = new URLSearchParams()
      params.append('records', this.records)
      this.axios.post('user/editrecords', params)
        .then(response => {
          var data = response.data
          if (data.status === 200) {
            // 新增成功
            this.$message({
              showClose: true,
              message: '修改成功！',
              type: 'success'
            })
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
    }
  },
  components: {
  },

  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getRecords()
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
