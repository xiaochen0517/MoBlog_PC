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
      <!-- 点赞按钮 -->
      <div width="100%"
           style="text-align: center;padding: 10px;">
        <el-button type="danger"
                   @click="likeArticle"
                   icon="el-icon-lollipop">收藏</el-button>
      </div>
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
                  placeholder="请输入评论，需大于等于5个字符"
                  v-model="commentstr">
        </el-input>
        <el-button type="primary"
                   @click="commitComment"
                   style="margin-top: 10px;">提交评论</el-button>
      </div>
      <!-- 用户评论列表 -->
      <div style="margin-top: 10px;"
           v-for="(item, index) in comment"
           :key="index">
        <!-- 头像 -->
        <el-avatar style="float: left;margin-right: 10px;"
                   :size="50">Mo</el-avatar>
        <!-- 评论内容 -->
        <div width="100%"
             clear>
          <strong>{{item.username}}</strong>
          <br>
          <div style="float: left;">{{item.content}}</div>
          <div style="float: right;">{{item.time}}</div>
          <br>
        </div>
        <div style="clear:both;"></div>
      </div>
      <el-pagination background
                     style="margin-top: 10px;"
                     layout="prev, pager, next"
                     :total="total"
                     @current-change="currentChange"
                     :current-page.sync="currentPage"
                     :hide-on-single-page="true">
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
      // 评论输入框
      commentstr: '',
      // 文章信息
      articleId: 0,
      articleTitle: '',
      articleTime: '',
      articleSort: '',
      articleBrowse: 0,
      articleUsername: '',
      articleContent: '',
      // 文章获取失败时显示
      returnMsg: '文章获取错误，请稍后重试！',
      returnShow: false,
      // 评论
      comment: [],
      total: 20,
      currentPage: 1
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
      this.axios.get('blog/article', { params: params })
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
          this.getComment(1)
        })
        .catch((error) => {
          console.log(error)
          this.returnMsg = '文章获取错误，请稍后重试！'
          this.returnShow = true
        })
    },
    // 提交评论
    commitComment: function () {
      // 判断是否登录
      var un = this.$Cookies.get('un')
      if (un === undefined || un === '') {
        // 未登录，跳转到登录界面
        this.$message({
          showClose: true,
          message: '请先登录！',
          type: 'error'
        })
        this.$Cookies.set('un', '')
        this.$router.push({ path: '/login' })
        return
      }
      // 判断评论框中的值
      var commentstr = this.commentstr
      if (commentstr === undefined || commentstr.length < 5) {
        // 评论内容不合法
        this.$message({
          showClose: true,
          message: '请重新输入评论内容！',
          type: 'error'
        })
        return
      }
      // 开始提交
      var params = new URLSearchParams()
      params.append('username', un)
      params.append('aid', this.articleId)
      params.append('content', commentstr)
      this.axios.post('user/comment', params)
        .then(response => {
          var data = response.data
          if (data.status === 200) {
            this.$message({
              showClose: true,
              message: '评论成功！',
              type: 'success'
            })
            this.commentstr = ''
            this.currentPage = 1
            this.getComment(1)
          } else if (data.status === 499) {
            // 需要重新登录
            this.$message({
              showClose: true,
              message: '请先登录！',
              type: 'error'
            })
            this.$Cookies.set('un', '')
            this.$router.push({ path: '/login' })
          } else {
            this.$message({
              showClose: true,
              message: '评论失败！',
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          console.log(error)
          // 提交失败
          this.$message({
            showClose: true,
            message: '网络错误，请稍后重试！',
            type: 'error'
          })
        })
    },
    // 评论换页
    currentChange: function (val) {
      this.getComment(val)
    },
    // 获取评论
    getComment: function (page) {
      if (this.articleId < 1) {
        // 文章id错误
        return
      }
      var params = new URLSearchParams()
      params.append('aid', this.articleId)
      params.append('page', page)
      this.axios.get('blog/comment', { params: params })
        .then(response => {
          var data = response.data
          if (data.status === 200 || data.commentsize > 0) {
            // 成功获取
            this.total = data.commentsize
            this.comment = data.comment
          } else {
            this.comment = []
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    // 收藏文章
    likeArticle: function () {
      // 判断是否处于登录状态
      // 判断是否登录
      var un = this.$Cookies.get('un')
      if (un === undefined || un === '') {
        // 未登录，跳转到登录界面
        this.$message({
          showClose: true,
          message: '请先登录！',
          type: 'error'
        })
        this.$router.push({ path: '/login' })
        return
      }
      // 开始提交
      var params = new URLSearchParams()
      params.append('username', un)
      params.append('aid', this.articleId)
      this.axios.post('user/articlelike', params)
        .then(response => {
          var data = response.data
          if (data.status === 200) {
            this.$message({
              showClose: true,
              message: '成功收藏！',
              type: 'success'
            })
            this.commentstr = ''
            this.currentPage = 1
            this.getComment(1)
          } else if (data.status === 407) {
            // 已经收藏
            this.$message({
              showClose: true,
              message: '已经收藏过了哦！',
              type: 'info'
            })
          } else if (data.status === 499) {
            // 需要重新登录
            this.$message({
              showClose: true,
              message: '请先登录！',
              type: 'info'
            })
            this.$Cookies.set('un', '')
            this.$router.push({ path: '/login' })
          } else {
            this.$message({
              showClose: true,
              message: '收藏失败！',
              type: 'error'
            })
          }
        })
        .catch(function (error) {
          console.log(error)
          // 提交失败
          this.$message({
            showClose: true,
            message: '网络错误，请稍后重试！',
            type: 'error'
          })
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
