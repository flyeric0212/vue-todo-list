import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './assets/main.css'

/**
 * 应用入口文件
 * 1. 创建Vue应用实例
 * 2. 使用Pinia进行状态管理
 * 3. 使用Vue Router进行路由管理
 * 4. 挂载应用到DOM
 */
const app = createApp(App)

// 使用Pinia进行状态管理
app.use(createPinia())

// 使用Vue Router进行路由管理
app.use(router)

// 挂载应用到DOM
app.mount('#app')
