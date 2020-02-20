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
      articleTitle: '文章名称',
      articleTime: '2020-01-01',
      articleSort: 'spring mvc',
      articleBrowse: 200,
      articleContent: ''
    }
  },
  components: {
    cbread
  },
  mounted () {
    // 测试内容
    var mdtext = 'fdasdfasrwa\n' +
      '# fdjkslahf\n## jfdksljf\n### jfdksljf\n#### jfdksljf\n##### jfdksljf\n' +
      '- kdlshafe\n```java\nint a = 10;\n```\n' +
      '[中文](https://www.baidu.com)\n\n' +
      '> 测试文本，多点好 \n' +
      '> jfdklsjf'
    this.articleContent = mdtext
    console.log(this)
  }
}
</script>

<style scoped>
</style>
