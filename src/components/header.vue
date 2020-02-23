<!-- header -->
<template>
  <div class='Header'>
    <el-menu class="el-menu-demo"
             mode="horizontal"
             default-active="/main/articlelist"
             router>
      <el-menu-item index="/main/articlelist">首页</el-menu-item>
      <el-menu-item index="/main/porfile">介绍</el-menu-item>
      <el-menu-item @click="toConsole"
                    style="float: right;">Mochen</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

export default {
  components: {},
  name: 'Header',
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleSelect (key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push({ path: '/main/articlelist' })
          break
        case '2':
          this.$router.push({ path: '/main/porfile' })
          break
        case '3':
          if (this.$Cookies.get('un') === undefined || this.$Cookies.get('un') === '') {
            this.$router.push({ path: '/login' })
          } else {
            this.$router.push({ path: '/console/home' })
          }
          break
      }
    },
    toConsole: function () {
      if (this.$Cookies.get('un') === undefined || this.$Cookies.get('un') === '') {
        this.$router.push({ path: '/login' })
      } else {
        this.$router.push({ path: '/console/home' })
      }
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
</style>
