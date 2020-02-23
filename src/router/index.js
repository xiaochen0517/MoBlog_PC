import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import main from '@/components/main'
import articlelist from '@/components/articlelist'
import articlecontent from '@/components/articlecontent'
import porfile from '@/components/porfile'
import console from '@/components/user/console'
import uhome from '@/components/user/home'
import mdeditor from '@/components/user/mdeditor'
import myblog from '@/components/user/myblog'
import sortmanage from '@/components/user/sortmanage'
import homemsg from '@/components/user/homemsg'
import introduce from '@/components/user/introduce'
import flinks from '@/components/user/flinks'
import homephoto from '@/components/user/homephoto'

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
        component: articlelist
      },
      {
        path: 'articlecontent/:id',
        component: articlecontent
      },
      {
        path: 'porfile',
        component: porfile
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
    path: '/console',
    name: 'console',
    component: console,
    children: [
      {
        path: 'home',
        name: 'uhome',
        component: uhome
      },
      {
        path: 'mdeditor',
        name: 'mdeditor',
        component: mdeditor
      },
      {
        path: 'myblog',
        name: 'myblog',
        component: myblog
      },
      {
        path: 'sortmanage',
        name: 'sortmanage',
        component: sortmanage
      },
      {
        path: 'homemsg',
        name: 'homemsg',
        component: homemsg
      },
      {
        path: 'introduce',
        name: 'introduce',
        component: introduce
      },
      {
        path: 'flinks',
        name: 'flinks',
        component: flinks
      },
      {
        path: 'homephoto',
        name: 'homephoto',
        component: homephoto
      }
    ]
  }]
})
