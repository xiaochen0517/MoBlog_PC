<!--  -->
<template>
  <div class="">
    <el-card class="box-card"
             style="margin-top: 15px;">
      <div slot="header"
           class="clearfix"
           style="text-align: center;">
        <h2>个人介绍</h2>
      </div>
      <div>
        <div style="width: 100%;text-align: center;">
          <img :src="perImg"
               style="width: 300px;height: 300px;"
               alt="perphoto">
        </div>
        <mavon-editor :value="perContent"
                      :subfield="false"
                      :defaultOpen="'preview'"
                      :toolbarsFlag="false"
                      :boxShadow="false"
                      :transition="false"></mavon-editor>
      </div>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: '',
  data () {
    return {
      perImg: '',
      perContent: ''
    }
  },
  components: {
  },
  methods: {
    // 获取内容
    getPerMsg () {
      this.axios.get('blog/permsg')
        .then(response => {
          var data = response.data
          // 判断获取的数据
          if (data.status === 200) {
            this.perImg = data.perphoto
            this.perContent = data.percontent
          } else if (data.status === 404) {
            // 获取到的轮播图为0
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // 开始获取
    this.getPerMsg()
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
