<!-- articlelist -->
<template>
  <div class="articlelist">
    <!-- 轮播图 -->
    <el-carousel height="150px">
      <el-carousel-item v-for="item in 4"
                        :key="item"
                        style="background-color: blue;">
        <h3 class="small">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <br />
    <!-- 文章卡片 -->
    <div v-for="(item, index) in articleList"
         :key="index">
      <el-card id="articleCard"
               class="box-card"
               shadow="hover"
               :body-style="{ padding: '10px' }"
               @click.native="article(item.id)">
        <img width="150px"
             height="150px"
             src="http://i2.w.yun.hjfile.cn/doc/201303/54c809bf-1eb2-400b-827f-6f024d7d599b_00.jpg"
             alt="img"
             style="float: left;" />
        <div style="float: left;margin-left: 10px;"
             @click.stop>
          <h3>{{item.title}}</h3>
          <div>
            <p>发布时间：{{item.publisht}} 分类：{{item.sort}}</p>
          </div>
          <br>
          <el-tag v-for="(litem, lindex) in item.label"
                  :key="lindex">{{litem}}</el-tag>
        </div>
        <div style="clear: both;"></div>
      </el-card>
    </div>
    <br>
    <!-- 底部换页控件 -->
    <el-pagination background
                   layout="prev, pager, next"
                   :total="totalSize"
                   :current-page.sync="currentPage"
                   @current-change="currentChange">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'articlelist',
  data () {
    return {
      currentPage: 1,
      activeIndex: '1',
      articleList: [{ browse: 0, id: 1, label: [''], like: 0, publisht: '', sort: '', title: '', username: '' }],
      totalSize: 1
    }
  },
  props: ['msg'],
  components: {
  },
  methods: {
    article: function (id) {
      this.$router.push({ path: '/main/articlecontent/' + id })
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    currentChange: function (val) {
      this.getArticle()
    },
    // 获取首页文章列表
    getArticle: function () {
      var params = new URLSearchParams()
      params.append('page', this.currentPage)
      this.axios.get('http://127.0.0.1:8080/moblog/blog/homearticle', { params: params })
        .then(response => {
          var data = response.data
          // 将文章关键词进行拆分
          for (var i = 0; i < data.articlelist.length; i++) {
            var labels = data.articlelist[i].label
            data.articlelist[i].label = labels.split(',')
          }
          this.articleList = data.articlelist
          this.totalSize = data.articlesize
          document.body.scrollTop = document.documentElement.scrollTop = 0
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 获取搜索文章列表
    getSearch: function () {
      var params = new URLSearchParams()
      params.append('keyword', this.msg)
      params.append('page', this.currentPage)
      this.axios.get('http://127.0.0.1:8080/moblog/blog/searcharticle', { params: params })
        .then(response => {
          var data = response.data
          for (var i = 0; i < data.articlelist.length; i++) {
            var labels = data.articlelist[i].label
            data.articlelist[i].label = labels.split(',')
          }
          this.articleList = data.articlelist
          this.totalSize = data.articlesize
          document.body.scrollTop = document.documentElement.scrollTop = 0
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  watch: {
    // 监听父组件传入的搜索关键词数据是否发生变化
    msg (nv, ov) {
      console.log('articleList --> ' + this.msg)
      if (this.msg !== '') {
        // 开始获取搜索数据
        this.getSearch()
      }
    }
  },
  mounted () {
    if (this.msg === '') {
      // 获取首页文章
      this.getArticle()
    } else {
      // 获取搜索文章
      this.getSearch()
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin-left: 5px;
  margin-right: 5px;
}

.el-card,
.articleCard {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
