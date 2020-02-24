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
        <p>昵称：</p>
        <el-divider></el-divider>
        <p>地址：</p>
        <el-divider></el-divider>
        <p>邮箱：</p>
        <el-divider></el-divider>
        <p>电话：</p>
        <el-divider></el-divider>
        <p>介绍：</p>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  name: 'userhome',
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
    logout: function () {
    }
  },
  components: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
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
