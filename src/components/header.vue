<!-- header -->
<template>
  <div class='Header'>
    <el-menu :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">介绍</el-menu-item>
      <el-menu-item index="3"
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
      activeIndex: '1'
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleSelect (key, keyPath) {
      switch (key) {
        case '1':
          this.$router.push({ path: '/main', redirect: '/main/articlelist' })
          break
        case '2':
          this.$router.push({ path: '/porfile', redirect: '/main/porfile' })
          break
        case '3':
          this.$router.push({ path: '/login' })
          break
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
