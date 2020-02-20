<!-- mdeditor -->
<template>
  <div class="mdeditor">
    <el-card class="box-card"
             style="margin-bottom: 10px;">
      <el-input id="title"
                v-model="title"
                placeholder="请输入文章标题"></el-input>
      <el-button id="draftBut"
                 type="primary">存为草稿</el-button>
      <el-button id="pushBut"
                 type="success"
                 @click="drawer = true">发布文章</el-button>
    </el-card>
    <mavon-editor id="md-box"
                  ref="editor"
                  v-model="content"
                  :ishljs="true"
                  @imgAdd="$imgAdd"
                  @imgDel="$imgDel"> </mavon-editor>
    <!-- 侧边栏 -->
    <el-drawer title="我是标题"
               :visible.sync="drawer"
               :direction="direction"
               :before-close="handleClose">
      <span>我来啦!</span>
    </el-drawer>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'mdeditor',
  data () {
    return {
      title: '',
      content: '',
      drawer: false
    }
  },
  components: {
  },
  methods: {
    // 添加图片
    $imgAdd (pos, $file) {
      // 第一步.将图片上传到服务器.
      console.log('test')
    },
    // 删除图片
    $imgDel (pos) {
      console.log('delete')
    },
    showContent () {
      console.log(this.content)
    },
    handleClose (done) {
      done()
    }
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
.el-input,
.title {
  width: 79%;
}

.el-button {
  width: 8%;
  margin-left: 1%;
  margin-right: 1%;
}

#md-box {
  height: 500px !important;
}
</style>
