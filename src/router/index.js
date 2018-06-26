import Vue from 'vue'
import Router from 'vue-router'
import g from '../g.js'

Vue.use(Router)


g.routes = [
    {
        path: '/',
        name: 'login',
        meta:{
            allow : true
        },
        component: (resolve) => require(['../components/login.vue'], resolve)
    },
    {
        path: '/error',
        name: 'error',
        meta:{
            allow : true
        },
        component: (resolve) => require(['../components/404.vue'], resolve)
    },
    {
        path:'/sys/pv/menu',
        name: 'menu',
        meta:{
            allow : true
        },
        component: (resolve) => require(['../components/menu.vue'], resolve)
    },
    {
        path: '/rpt',
        name: '报表中心',
        meta:{
            children : [],
            show: false
        }
    },
    {
        path: '/rpt/all',
        name: '全部',
        meta:{
            show : false
        },
        component: (resolve) => require(['../components/all.vue'], resolve)
    },
    {
        path: '/rpt/daliy',
        name: '基础日报',
        meta:{
            children:[],
            show: false
        }
    },
    {
        path: '/rpt/daliy/publish',
        name: '发卡日报',
        meta:{
            show : false
        },
        component: (resolve) => require(['../components/d_publish.vue'], resolve)
    },
    {
        path: '/rpt/daliy/deposit',
        name: '消费日报',
        meta:{
            show : false
        },
        component: (resolve) => require(['../components/d_deposit.vue'], resolve)
    },
    {
        path: '/rpt/month',
        name: '基础月报',
        meta:{
            show : false
        },
         meta:{
            children:[]
        }
    },
    {
        path: '/rpt/month/publish',
        name: '发卡月报',
        meta:{
            show : false
        },
        component: (resolve) => require(['../components/m_publish.vue'], resolve)
    },
    {
        path: '/rpt/month/deposit',
        name: '消费月报',
        meta:{
            show : false
        },
        component: (resolve) => require(['../components/m_deposit.vue'], resolve)
    },
    {
        path: '/rpt/year',
        name: '基础年报',
         meta:{
            children:[]
        }
    },
    {
        path: '/rpt/year/publish',
        name: '发卡年报',
        meta:{
            show : false
        },
        component: (resolve) => require(['../components/y_publish.vue'], resolve)
    },
    {
        path: '/rpt/year/deposit',
        name: '消费年报',
        meta:{
            show : false
        },
        component: (resolve) => require(['../components/y_deposit.vue'], resolve)
    },
    {
        path: '/sys',
        name: '系统管理',
        meta:{
            children:[],
            show:false
        }
    },
    {
        path: '/sys/role',
        name: '角色管理',
        meta:{
            show : false
        },
        component: (resolve) => require(['../components/role.vue'], resolve)

    },
    {
        path: '/sys/user',
        name: '用户管理',
        meta:{
            show : false
        },
        component: (resolve) => require(['../components/user.vue'], resolve)
    },
    {
        path: '/sys/log',
        name: '系统日志',
        meta:{
            show : false
        },
        component: (resolve) => require(['../components/log.vue'], resolve)
    }
  ]

export const router = new Router({  routes : g.routes });
