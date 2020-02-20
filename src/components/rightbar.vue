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
                      placeholder="请输入内容"></el-input>
          </el-col>
          <el-col :push="2"
                  :span="6">
            <el-button round>搜索</el-button>
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
      <div>
        <img width="50px"
             height="50px"
             src="http://i2.w.yun.hjfile.cn/doc/201303/54c809bf-1eb2-400b-827f-6f024d7d599b_00.jpg"
             alt="img"
             style="float: left;" />
        <div style="float: left;margin-left: 10px;">
          <h3>卡片名称</h3>
          <div>列表内容</div>
        </div>
        <div style="clear: both;"></div>
      </div>
      <el-divider></el-divider>
      <div>
        <img width="50px"
             height="50px"
             src="http://i2.w.yun.hjfile.cn/doc/201303/54c809bf-1eb2-400b-827f-6f024d7d599b_00.jpg"
             alt="img"
             style="float: left;" />
        <div style="float: left;margin-left: 10px;">
          <h3>卡片名称</h3>
          <div>列表内容</div>
        </div>
        <div style="clear: both;"></div>
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
      searchText: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
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
