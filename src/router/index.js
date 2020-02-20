import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import main from '@/components/main'
import articlelist from '@/components/articlelist'
import articlecontent from '@/components/articlecontent'
import porfile from '@/components/porfile'
import mdeditor from '@/components/mdeditor'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/main/articlelist'
  },
  {
    path: '/main',
    name: 'main',
    component: main,
    children: [
      {
        path: 'articlelist',
        component: articlelist,
        alias: '/main'
      },
      {
        path: 'articlecontent',
        component: articlecontent,
        alias: '/article'
      },
      {
        path: 'porfile',
        component: porfile,
        alias: '/porfile'
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
  {
    path: '/mdeditor',
    name: 'mdeditor',
    component: mdeditor
  }]
})
