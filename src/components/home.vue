<!-- home -->
<template>
  <div class='home'>
    <el-container>
      <!-- 头部导航区 -->
      <el-header>
        <cheader />
      </el-header>
      <el-container>
        <el-container>
          <!-- 主内容区 -->
          <el-main>
            <el-card class="box-card"
                     style="margin-top: 15px;">
              <div slot="header"
                   class="clearfix"
                   style="text-align: center;">
                <h3>个人介绍</h3>
              </div>
              <div>
                列表内容
                <el-row>
                  <el-col :span="12">
                    <img src="@/assets/logo.png"
                         alt="">
                  </el-col>
                  <el-col :span="12">
                    <ul>
                      <li>test1</li>
                      <li>test1</li>
                      <li>test1</li>
                    </ul>
                  </el-col>
                </el-row>
              </div>
            </el-card>
          </el-main>
          <!-- 右侧边栏 -->
          <el-aside width="300px">
            <crightbar />
          </el-aside>
        </el-container>
        <!-- 底部栏 -->
        <el-footer>
          <cfooter />
        </el-footer>
      </el-container>
    </el-container>
    <cbacktop />
  </div>
</template>

<script >
import cheader from './header'
import crightbar from './rightbar'
import cbacktop from './backtop'
import cfooter from './footer'
import axios from 'axios'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {
    cheader,
    crightbar,
    cbacktop,
    cfooter
  },
  name: 'home',
  data () {
    // 这里存放数据
    return {
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    Test1: function () {
      axios.post('http://127.0.0.1:80/moblog/test/test1', null)
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    Test2: function () {
    }
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
</style>
