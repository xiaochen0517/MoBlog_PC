<!-- footer -->
<template>
  <div class='Footer'>
    <el-row v-for="(items, index) in blogrolls"
            :key="index">
      <el-col :span="3"
              class="links"
              v-for="(item, index) in items"
              :key="index">
        <el-link type="info"
                 :href="item.link"
                 target="_blank"
                 :underline="false">{{item.name}}</el-link>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-col :span="22"
              :push="1"
              style="text-align: left;">
        <div>
          备案号：{{records}}
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20"
              :push="2">
        <div>
          <p>Copyright © 2020 · BY：MoChen</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  components: {},
  name: 'Footer',
  data () {
    return {
      blogrolls: [
        // [{ name: 'aaa', link: 'http://www.baidu.com' }, { name: 'aaa', link: 'aaa' }],
        // [{ name: 'aaa', link: 'aaa' }, { name: 'aaa', link: 'aaa' }]
      ],
      records: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    // 获取友链
    getBlogRoll () {
      // 获取数据
      this.axios.get('blog/blogroll')
        .then(response => {
          var data = response.data
          // 判断获取的数据
          if (data.status === 200) {
            // 成功获取
            if (data.blogrollsize > 8) {
              // 分层
              var rowsize = data.blogrollsize / 8 + (data.blogrollsize % 8 > 0 ? 1 : 0)
              var blogrolls = data.blogrolls
              var endresult = []
              // 将数据按8个为一组进行拆分
              for (let i = 0; i < rowsize; i++) {
                var a = blogrolls.slice(i * 8, (i + 1) * 8)
                endresult.push(a)
              }
              // 将拆分好的数据添加进页面
              this.blogrolls = endresult
            } else {
              // 直接写入数据
              this.blogrolls.push(data.blogrolls)
            }
          } else if (data.status === 404) {
            // 获取到的友链为空
          } else {
            // 请求错误
            this.$message({
              showClose: true,
              message: '友链获取错误！',
              type: 'error'
            })
          }
        })
        .catch((error) => {
          console.log(error)
          this.$message({
            showClose: true,
            message: '网络错误，请稍后重试！',
            type: 'error'
          })
        })
    },
    // 获取备案号
    getRecords () {
      this.axios.get('blog/records')
        .then(response => {
          var data = response.data
          // 判断获取的数据
          if (data.status === 200) {
            // 成功获取
            this.records = data.records
          } else {
            // 请求错误
            this.$message({
              showClose: true,
              message: '备案号获取错误！',
              type: 'error'
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    // 获取友链
    this.getBlogRoll()
    // 获取备案号
    this.getRecords()
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
.Footer {
  width: 100%;
  margin-top: 10px;
}

.el-col {
  text-align: center;
}

.el-divider {
  width: 96%;
  margin-left: 2%;
}
</style>
