<!-- articlecontent -->
<template>
  <div class="articlecontent">
    <cbread />
    <br>
    <!-- 文章卡片 -->
    <el-card class="box-card">
      <div slot="header"
           class="clearfix"
           style="text-align: center;">
        <h2>{{articleTitle}}</h2>
        <div>
          <i class="el-icon-date">{{articleTime}}</i>
          <i class="el-icon-s-flag">{{articleSort}}</i>
          <i class="el-icon-view">{{articleBrowse}}</i>
          <i class="el-icon-s-custom">{{articleUsername}}</i>
        </div>
      </div>
      <mavon-editor :value="articleContent"
                    :subfield="false"
                    :defaultOpen="'preview'"
                    :toolbarsFlag="false"
                    :boxShadow="false"
                    :transition="false"></mavon-editor>
      <!-- 错误信息显示 -->
      <div id="returnMsg"
           class="returnMsg"
           v-if="returnShow">{{returnMsg}}</div>
    </el-card>
    <br>
    <!-- 评论卡片 -->
    <el-card class="box-card">
      <div slot="header"
           class="clearfix">
        <span>评论</span>
      </div>
      <!-- 评论输入框 -->
      <div>
        <el-input type="textarea"
                  :rows="2"
                  placeholder="请输入评论"
                  v-model="commentstr">
        </el-input>
        <el-button type="primary"
                   style="margin-top: 10px;">提交评论</el-button>
      </div>
      <!-- 用户评论列表 -->
      <div style="margin-top: 10px;">
        <!-- 头像 -->
        <el-avatar style="float: left;"
                   :size="50"
                   :src="circleUrl"></el-avatar>
        <!-- 评论内容 -->
        <div style="float: left;margin-left: 10px">
          <strong>昵称</strong>
          <br>
          <div>评论内容</div>
          <br>
        </div>
        <div style="clear:both;"></div>
      </div>
      <el-pagination background
                     layout="prev, pager, next"
                     :total="1000">
      </el-pagination>
    </el-card>
  </div>
</template>

<script type="text/ecmascript-6">
// 面包屑
import cbread from './breadcrumb'

export default {
  name: 'articlecontent',
  data () {
    return {
      articleId: 0,
      commentstr: '',
      circleUrl: '',
      articleTitle: '',
      articleTime: '',
      articleSort: '',
      articleBrowse: 0,
      articleUsername: '',
      articleContent: '',
      returnMsg: '文章获取错误，请稍后重试！',
      returnShow: false
    }
  },
  components: {
    cbread
  },
  watch: {
    // 防止在文章页面点击推荐不刷新文章
    $route () {
      this.getArticleContent()
    }
  },
  methods: {
    // 获取文章具体内容
    getArticleContent: function () {
      this.articleId = this.$route.params.id
      var params = new URLSearchParams()
      params.append('id', this.articleId)
      this.axios.get('http://127.0.0.1:8080/moblog/blog/article', { params: params })
        .then(response => {
          var data = response.data.article
          // 将信息隐藏
          this.returnShow = false
          // 判断获取的数据
          if (data.status === 404) {
            // 参数错误
            this.returnMsg = '参数错误，请稍后重试！'
            this.returnShow = true
          } else if (data.status === 405) {
            // 文章数据为空
            this.returnMsg = '文章获取错误，请稍后重试！'
            this.returnShow = true
          }
          // for (var i = 0; i < data.articlelist.length; i++) {
          //   var labels = data.articlelist[i].label
          //   data.articlelist[i].label = labels.split(',')
          // }
          this.articleTitle = data.title
          this.articleTime = data.publisht
          this.articleSort = data.sort
          this.articleBrowse = data.browse
          this.articleContent = data.content
          this.articleUsername = data.username
        })
        .catch(function (error) {
          console.log(error)
          this.returnMsg = '文章获取错误，请稍后重试！'
          this.returnShow = true
        })
    }
  },
  mounted () {
    // 在初始化后获取文章数据
    this.getArticleContent()
  }
}
</script>

<style scoped>
.returnMsg,
#returnMsg {
  width: 0 auto;
  text-align: center;
  font-weight: bold;
}
</style>
