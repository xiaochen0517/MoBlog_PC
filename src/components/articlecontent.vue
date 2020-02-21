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
        <p>{{articleTime}} 分类:{{articleSort}} 阅读:{{articleBrowse}}</p>
      </div>
      <mavon-editor :value="articleContent"
                    :subfield="false"
                    :defaultOpen="'preview'"
                    :toolbarsFlag="false"
                    :boxShadow="false"
                    :transition="false"></mavon-editor>
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
      commentstr: '',
      circleUrl: '',
      articleTitle: '',
      articleTime: '',
      articleSort: '',
      articleBrowse: 0,
      articleContent: ''
    }
  },
  components: {
    cbread
  },
  methods: {
    // 获取文章具体内容
    getArticleContent: function () {
      var params = new URLSearchParams()
      params.append('id', this.$route.params.id)
      this.axios.get('http://127.0.0.1:8080/moblog/blog/article', { params: params })
        .then(response => {
          var data = response.data.article
          console.log(data)

          // for (var i = 0; i < data.articlelist.length; i++) {
          //   var labels = data.articlelist[i].label
          //   data.articlelist[i].label = labels.split(',')
          // }
          this.articleTitle = data.title
          this.articleTime = data.publisht
          this.articleSort = data.sort
          this.articleBrowse = data.browse
          this.articleContent = data.content
        })
        .catch(function (error) {
          console.log(error)
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
</style>
