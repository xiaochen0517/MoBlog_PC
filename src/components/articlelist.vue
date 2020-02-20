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
    <el-pagination background
                   layout="prev, pager, next"
                   :total="1000">
    </el-pagination>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'articlelist',
  data () {
    return {
      activeIndex: '1',
      date: new Date(),
      articleList: [
        { browse: 0, id: 1, label: ['JVM', 'Linux', 'Centos', '运维'], like: 0, publisht: '2020-02-11', sort: '分类1', title: 'Linux运维——服务管理', username: 'lxc' },
        { browse: 0, id: 2, label: ['JVM', 'Linux', 'Centos', '运维'], like: 0, publisht: '2020-02-11', sort: '分类1', title: 'Linux运维——启动引导与修复', username: 'lxc' },
        { browse: 0, id: 3, label: ['JVM', 'Linux', 'Centos', '运维'], like: 0, publisht: '2020-02-11', sort: '分类1', title: 'Eclipse 下载过慢问题', username: 'lxc' },
        { browse: 0, id: 4, label: ['JVM', 'Linux', 'Centos', '运维'], like: 0, publisht: '2020-02-11', sort: '分类1', title: 'Linux运维——高级文件系统管理', username: 'lxc' },
        { browse: 0, id: 5, label: ['JVM', 'Linux', 'Centos', '运维'], like: 0, publisht: '2020-02-11', sort: '分类1', title: 'JVM Garbage First 垃圾回收器', username: 'lxc' }
      ]
    }
  },
  components: {
  },
  methods: {
    article: function (id) {
      console.log(id)
      this.$router.push({ path: '/article', redirect: '/main/articlecontent' })
      document.body.scrollTop = document.documentElement.scrollTop = 0
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
