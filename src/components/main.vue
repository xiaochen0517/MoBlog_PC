<!-- main -->
<template>
  <div class="main1">
    <el-container>
      <!-- 头部导航区 -->
      <el-header>
        <cheader />
      </el-header>
      <el-container>
        <el-container>
          <!-- 主内容区 -->
          <el-main>
            <router-view />
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

<script>
import cheader from './header'
import crightbar from './rightbar'
import cbacktop from './backtop'
import cfooter from './footer'
export default {
  components: {
    cheader,
    crightbar,
    cbacktop,
    cfooter
  },
  name: 'main1',
  data () {
    return {
      activeIndex: '1',
      date: new Date(),
      articleList: [
        { browse: 0, id: 1, label: ['JVM', 'Linux', 'Centos', '运维'], like: 0, publisht: '2020-02-11', sort: '分类1', title: 'Linux运维——服务管理', username: 'lxc' },
        { browse: 0, id: 1, label: ['JVM', 'Linux', 'Centos', '运维'], like: 0, publisht: '2020-02-11', sort: '分类1', title: 'Linux运维——启动引导与修复', username: 'lxc' },
        { browse: 0, id: 1, label: ['JVM', 'Linux', 'Centos', '运维'], like: 0, publisht: '2020-02-11', sort: '分类1', title: 'Eclipse 下载过慢问题', username: 'lxc' },
        { browse: 0, id: 1, label: ['JVM', 'Linux', 'Centos', '运维'], like: 0, publisht: '2020-02-11', sort: '分类1', title: 'Linux运维——高级文件系统管理', username: 'lxc' },
        { browse: 0, id: 1, label: ['JVM', 'Linux', 'Centos', '运维'], like: 0, publisht: '2020-02-11', sort: '分类1', title: 'JVM Garbage First 垃圾回收器', username: 'lxc' }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () { },
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
