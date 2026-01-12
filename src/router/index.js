import { createRouter, createWebHashHistory } from 'vue-router'
import Try from '@/views/try/index.vue'
import Warehouse from '@/views/Warehouse/index.vue'





// 使用懒加载导入页面组件

const Park = () => import('@/views/Warehouse/Park.vue')
const Envtesting = () => import('@/views/Warehouse/Envtesting.vue')
const housework = () => import('@/views/Warehouse/housework.vue')
const device = () => import('@/views/Warehouse/device.vue')
const monitor = () => import('@/views/Warehouse/monitor.vue')

const shebgl = () => import('@/views/Warehouse/shebgl.vue')



const type1 = () => import('@/views/parkDetails/type1.vue')
const type2 = () => import('@/views/parkDetails/type2.vue')
const type3 = () => import('@/views/parkDetails/type3.vue')
const type4 = () => import('@/views/parkDetails/type4.vue')
const type5 = () => import('@/views/parkDetails/type5.vue')
const type6 = () => import('@/views/parkDetails/type6.vue')
const type7 = () => import('@/views/parkDetails/type7.vue')
const type8 = () => import('@/views/parkDetails/type8.vue')


const work1 = () => import('@/views/workDetails/work1.vue')
const work2 = () => import('@/views/workDetails/work2.vue')
const work3 = () => import('@/views/workDetails/work3.vue')
const work4 = () => import('@/views/workDetails/work4.vue')
const work5 = () => import('@/views/workDetails/work5.vue')









// 1. 定义路由规则
const routes = [
  // 404 页面处理
  {
    path: '/:pathMatch(.*)*',
    redirect: '/inspection'
  },
  {
    path: "/try",
    component: Try,
    name: 'Try',

  },
  {
    path: "/",
    component: Warehouse,
    name: 'Warehouse',
    redirect: '/Park', // 默认重定
    children: [
      {
        path: '/Park',
        name: 'Park',
        component: Park,
        meta: {
          title: '园区运营',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: false,
          showball: true,
        }
      },
      {
        path: '/Envtesting',
        name: 'Envtesting',
        component: Envtesting,
        meta: {
          title: '首页',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: false,
          showball: true,
        }
      },
      {
        path: '/housework',
        name: 'housework',
        component: housework,
        meta: {
          title: '仓储作业',
          keepAlive: false, // 如果需要缓存页面
          showMenu: true,
          showBack: false,
          showball: true,
        }
      },
      {
        path: '/device',
        name: 'device',
        component: device,
        meta: {
          title: '设备',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: false,
          showgl: true,
          showball: true,
        }
      },
      {
        path: '/monitor',
        name: 'monitor',
        component: monitor,
        meta: {
          title: '监控',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: false,
          showball: true,
        }
      },
      {
        path: '/shebgl',
        name: 'shebgl',
        component: shebgl,
        meta: {
          title: '监控',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: false,
          showgl: true,
          showball: true,
        }
      },
      {
        path: '/type1',
        name: 'type1',
        component: type1,
        meta: {
          title: '环境检测',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: true,
          showball: true,
        }
      },
      {
        path: '/type2',
        name: 'type2',
        component: type2,
        meta: {
          title: '能耗监测',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: true,
          showball: true,
        }
      },
      {
        path: '/type3',
        name: 'type3',
        component: type3,
        meta: {
          title: '',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: true,
          showball: true,
        }
      },
      {
        path: '/type4',
        name: 'type4',
        component: type4,
        meta: {
          title: '',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: true,
          showball: true,
        }
      },
      {
        path: '/type5',
        name: 'type5',
        component: type5,
        meta: {
          title: '',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: true,
          showball: true,
        }
      },
      {
        path: '/type6',
        name: 'type6',
        component: type6,
        meta: {
          title: '',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: true,
          showball: true,
        }
      },
      {
        path: '/type7',
        name: 'type7',
        component: type7,
        meta: {
          title: '',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: true,
          showball: true,
        }
      },
      {
        path: '/type8',
        name: 'type8',
        component: type8,
        meta: {
          title: '',
          keepAlive: false, // 如果需要缓存页面
          showMenu: false,
          showBack: true,
          showball: true,
        }
      },
      {
        path: '/work1',
        name: 'work1',
        component: work1,
        meta: {
          title: '仓储作业',
          keepAlive: false, // 如果需要缓存页面
          showMenu: true,
          showBack: false,
          showball: true,
        }
      },
      {
        path: '/work2',
        name: 'work2',
        component: work2,
        meta: {
          title: '仓储作业',
          keepAlive: false, // 如果需要缓存页面
          showMenu: true,
          showBack: false,
          showball: true,
        }
      },
      {
        path: '/work3',
        name: 'work3',
        component: work3,
        meta: {
          title: '仓储作业',
          keepAlive: false, // 如果需要缓存页面
          showMenu: true,
          showBack: false,
          showball: true,
        }
      },
      {
        path: '/work4',
        name: 'work4',
        component: work4,
        meta: {
          title: '仓储作业',
          keepAlive: false, // 如果需要缓存页面
          showMenu: true,
          showBack: false,
          showball: true,
        }
      },
      {
        path: '/work5',
        name: 'work5',
        component: work5,
        meta: {
          title: '仓储作业',
          keepAlive: false, // 如果需要缓存页面
          showMenu: true,
          showBack: false,
          showball: true,
        }
      },



    ]



  }
]


const router = createRouter({
  history: createWebHashHistory('/'),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { selector: to.hash }  // 处理锚点跳转干扰^[4][8]
  }
})

export default router
