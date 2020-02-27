<!-- console -->
<template>
  <div class="console">
    <el-container>
      <!-- 头部 -->
      <el-header style="text-align: center;padding-top: 18px">
        <el-page-header @back="goBack"
                        content="用户控制台"
                        title="主页" />
      </el-header>
      <el-container>
        <!-- 左侧导航栏 -->
        <el-aside width="18%"
                  style="min-height: 100%;height: auto;">
          <el-menu default-active="2"
                   style="min-height: 100%;height: auto;"
                   class="el-menu-vertical-demo"
                   router>
            <el-menu-item index="/console/home">
              <i class="el-icon-s-home"></i>
              <span slot="title">主页</span>
            </el-menu-item>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-s-marketing"></i>
                <span>文章管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/console/myblog">
                  <i class="el-icon-document"></i>
                  <span>我的博客</span>
                </el-menu-item>
                <el-menu-item index="/console/sortmanage">
                  <i class="el-icon-receiving"></i>
                  <span>分类管理</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="/console/mdeditor">
              <i class="el-icon-edit"></i>
              <span slot="title">写文章</span>
            </el-menu-item>
            <el-submenu index="3"
                        v-if="adminstatus">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/console/homemsg">
                  <i class="el-icon-info"></i>
                  <span>主页信息</span>
                </el-menu-item>
                <el-menu-item index="/console/introduce">
                  <i class="el-icon-user"></i>
                  <span>介绍页面</span>
                </el-menu-item>
                <el-menu-item index="/console/flinks">
                  <i class="el-icon-link"></i>
                  <span>友链管理</span>
                </el-menu-item>
                <el-menu-item index="/console/homephoto">
                  <i class="el-icon-picture-outline"></i>
                  <span>主页轮播图</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else
                          disabled>
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>设置</span>
              </template>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- 主内容区 -->
        <el-main style="min-height: 100%;height: auto;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <cbacktop />
  </div>
</template>

<script type="text/ecmascript-6">
import cbacktop from '../backtop'

export default {
  name: 'console',
  data () {
    return {
      adminstatus: true
    }
  },
  computed: {},
  watch: {},
  methods: {
    goBack: function () {
      this.$router.push({ path: '/main/articlelist' })
    }
  },
  components: {
    cbacktop
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () { },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {
    this.adminstatus = this.$Cookies.get('adminstatus')
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
