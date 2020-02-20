<!-- footer -->
<template>
  <div class='Footer'>
    <el-row>
      <el-col :span="20"
              :push="2"
              class="links">
        <el-link type="info"
                 :underline="false">主要链接</el-link>
        <el-link type="info"
                 :underline="false">主要链接</el-link>
        <el-link type="info"
                 :underline="false">主要链接</el-link>
        <el-link type="info"
                 :underline="false">主要链接</el-link>
        <el-link type="info"
                 :underline="false">主要链接</el-link>
        <el-link type="info"
                 :underline="false">主要链接</el-link>
        <el-link type="info"
                 :underline="false">主要链接</el-link>
        <el-link type="info"
                 :underline="false">主要链接</el-link>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="22"
              :push="1"
              style="text-align: left;">
        <div>
          备案号：
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20"
              :push="2">
        <div>
          <p>Copyright 2020 个人博客 · BY：MoChen</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  components: {},
  name: 'Footer',
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  methods: {
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
.Footer {
  width: 100%;
  margin-top: 10px;
}

.el-col {
  text-align: center;
}

.el-divider {
  width: 96%;
  margin-left: 2%;
}

.links > .el-link {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
