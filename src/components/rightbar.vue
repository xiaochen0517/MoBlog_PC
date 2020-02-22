<!-- rightbar -->
<template>
  <div class='RightBar'>
    <br>
    <el-card>
      <div slot="header">
        <span>文章搜索</span>
      </div>
      <div>
        <el-row>
          <el-col :span="15">
            <el-input v-model="searchText"
                      placeholder="请输入内容"
                      clearable></el-input>
          </el-col>
          <el-col :push="2"
                  :span="6">
            <el-button @click="searchBut"
                       round>搜索</el-button>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <br>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>文章推荐</span>
      </div>
      <!-- 文章推荐list -->
      <div v-for="(item, index) in recommend"
           :key="index">
        <el-link type="primary"
                 @click="showArticle(item.id)">{{item.title}}</el-link>
        <el-divider v-if="index != (recommend.length-1)"></el-divider>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>文章标签</span>
      </div>
      <div>
        <el-tag>标签一</el-tag>
        <el-tag type="success">标签二</el-tag>
        <el-tag type="info">标签三</el-tag>
        <el-tag type="warning">标签四</el-tag>
        <el-tag type="danger">标签五</el-tag>
      </div>
    </el-card>

  </div>
</template>

<script>

export default {
  components: {},
  name: 'RightBar',
  data () {
    return {
      searchText: '',
      recommend: []
    }
  },
  computed: {},
  watch: {},
  methods: {
    searchBut: function () {
      // 在点击搜索按钮时，将关键词数据上传到父组件，再由父组件传到文章列表组件
      if (this.searchText !== '') { this.$emit('search', this.searchText) }
    },
    // 获取推荐
    getRecommend: function () {
      var params = new URLSearchParams()
      params.append('page', this.currentPage)
      this.axios.get('http://127.0.0.1:8080/moblog/blog/recommend', { params: params })
        .then(response => {
          var data = response.data
          if (data.status === 404) {
            // 获取推荐错误
            return
          }
          this.recommend = data.lists
        })
        .catch(error => {
          console.log(error)
        })
    },
    showArticle: function (id) {
      // 显示文章，跳转路由
      this.$router.push({ path: '/main/articlecontent/' + id })
      document.body.scrollTop = document.documentElement.scrollTop = 0
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.getRecommend()
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
.RightBar {
  margin-right: 10px;
}

.el-card {
  margin-top: 15px;
  margin-bottom: 15px;
}

.el-tag {
  margin-top: 5px;
  margin-bottom: 5px;
}
</style>
