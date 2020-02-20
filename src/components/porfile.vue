<!--  -->
<template>
  <div class="">
    <el-card class="box-card"
             style="margin-top: 15px;">
      <div slot="header"
           class="clearfix"
           style="text-align: center;">
        <h3>个人介绍</h3>
      </div>
      <div>
        列表内容
        <el-row>
          <el-col :span="12">
            <img src="@/assets/logo.png"
                 alt="">
          </el-col>
          <el-col :span="12">
            <ul>
              <li>test1</li>
              <li>test1</li>
              <li>test1</li>
            </ul>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
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
