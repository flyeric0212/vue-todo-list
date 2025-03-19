import { createRouter, createWebHistory } from 'vue-router'

/**
 * Vue Router 配置文件
 * createRouter 用于创建一个路由器实例
 * 参数包括：
 * 1. history模式：这里使用 createWebHistory 创建HTML5 历史模式
 * 2. routes 数组：定义应用的路由规则
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/active',
      name: 'active',
      component: () => import('../views/ActiveView.vue'),
      meta: { title: '未完成任务' }
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('../views/CompletedView.vue'),
      meta: { title: '已完成任务' }
    },
    {
      path: '/todo/:id',
      name: 'todo-detail',
      component: () => import('../views/TodoDetailView.vue'),
      props: true, // 将路由参数作为props传递给组件
      meta: { title: '任务详情' }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { title: '关于' }
    }
  ]
})

// 全局前置守卫，用于设置页面标题
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || 'Todo App'
  next()
})

export default router