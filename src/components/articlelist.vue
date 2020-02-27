<!-- articlelist -->
<template>
  <div class="articlelist">
    <!-- 轮播图 -->
    <el-carousel height="150px">
      <el-carousel-item v-for="(item, index) in homePhotos"
                        :key="index"
                        style="background-color: blue;">
        <img style="width: 100%;height: 100%;"
             :src="item.link"
             :alt="item.name">
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
          <h3>{{item.title}}
            <i v-if="item.browse >= 100 && item.browse < 1000"
               class="el-icon-trophy"></i>
            <i v-if="item.browse >= 1000 && item.browse < 10000"
               class="el-icon-medal"></i>
            <i v-if="item.browse >= 10000"
               class="el-icon-medal-1"></i>
          </h3>
          <div>
            <i class="el-icon-date">{{item.publisht}} </i>
            <i class="el-icon-s-flag">{{item.sort}} </i>
            <i class="el-icon-view">{{item.browse}} </i>
            <i class="el-icon-s-custom">{{item.username}}</i>
          </div>
          <br>
          <el-tag v-for="(litem, lindex) in item.label"
                  :key="lindex">{{litem}}</el-tag>
        </div>
        <div style="clear: both;"></div>
      </el-card>
    </div>
    <!-- 错误信息显示 -->
    <div id="returnMsg"
         class="returnMsg"
         v-if="returnShow">{{returnMsg}}</div>
    <br>
    <!-- 底部换页控件 -->
    <el-pagination background
                   layout="prev, pager, next"
                   :total="totalSize"
                   :current-page.sync="currentPage"
                   @current-change="currentChange"
                   :hide-on-single-page="true">
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
      articleList: [
        // { browse: 0, id: 1, label: [''], like: 0, publisht: '', sort: '', title: '', username: '' }
      ],
      totalSize: 1,
      returnMsg: '文章获取错误，请稍后重试！',
      returnShow: false,
      homePhotos: [
        // { name: 'aaa', link: 'https://08imgmini.eastday.com/mobile/20200225/20200225054517_cf6647be23e5aeaaf326a744fd6ad601_1.jpeg' },
        // { name: 'aaa', link: 'https://08imgmini.eastday.com/mobile/20200225/20200225054517_cf6647be23e5aeaaf326a744fd6ad601_1.jpeg' },
      ]
    }
  },
  props: ['msg'],
  components: {
  },
  computed: {
  },
  methods: {
    // 跳转到文章内容
    article: function (id) {
      this.$router.push({ path: '/main/articlecontent/' + id })
      document.body.scrollTop = document.documentElement.scrollTop = 0
    },
    // 换页
    currentChange: function (val) {
      this.getArticle()
    },
    // 获取首页文章列表
    getArticle: function () {
      var params = new URLSearchParams()
      params.append('page', this.currentPage)
      this.axios.get('blog/homearticle', { params: params })
        .then(response => {
          var data = response.data
          // 将信息隐藏
          this.returnShow = false
          // 判断获取的数据
          if (data.status === 404) {
            // 参数错误
            this.returnMsg = '文章获取错误，请稍后重试！'
            this.returnShow = true
            return
          } else if (data.status === 200 && data.articlesize === 0) {
            // 获取到的文章为0
            this.returnMsg = '文章数目为0'
            this.returnShow = true
            return
          }
          // 将文章关键词进行拆分
          for (var i = 0; i < data.articlelist.length; i++) {
            var labels = data.articlelist[i].label
            data.articlelist[i].label = labels.split(',')
          }
          this.articleList = data.articlelist
          this.totalSize = data.articlesize
          document.body.scrollTop = document.documentElement.scrollTop = 0
        })
        .catch(error => {
          console.log(error)
          this.returnMsg = '文章获取错误，请稍后重试！'
          this.returnShow = true
        })
    },
    // 获取搜索文章列表
    getSearch: function () {
      var params = new URLSearchParams()
      params.append('keyword', this.msg)
      params.append('page', this.currentPage)
      this.axios.get('blog/searcharticle', { params: params })
        .then(response => {
          var data = response.data
          if (data.status === 404) {
            // 参数错误
            this.returnMsg = '文章获取错误，请稍后重试！'
            this.returnShow = true
            return
          } else if (data.status === 200 && data.articlesize === 0) {
            // 获取到的文章为0
            this.returnMsg = '无结果'
            this.returnShow = true
            return
          }
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
          this.returnMsg = '文章获取错误，请稍后重试！'
          this.returnShow = true
        })
    },
    // 获取轮播图数据
    getHomePhoto: function () {
      this.axios.get('blog/homephotos')
        .then(response => {
          var data = response.data
          // 判断获取的数据
          if (data.status === 200) {
            this.homePhotos = data.homephotos
          } else if (data.status === 404) {
            // 获取到的轮播图为0
          }
        })
        .catch(error => {
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
    // 获取轮播图数据
    this.getHomePhoto()
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

.returnMsg,
#returnMsg {
  width: 0 auto;
  text-align: center;
  font-weight: bold;
}
</style>
