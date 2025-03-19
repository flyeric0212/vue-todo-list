# Vue 3 待办事项应用

这是一个使用Vue 3开发的现代待办事项（Todo List）应用，采用最新的Vue生态系统工具和最佳实践构建。

## 技术栈

- **Vue 3** - 使用Composition API和`<script setup>`语法
- **Vite** - 下一代前端构建工具，提供极速的开发体验
- **Vue Router 4** - Vue.js的官方路由
- **Pinia** - Vue的状态管理库，Vuex的继任者

## 功能特点

- 创建、查看、编辑和删除待办事项
- 标记待办事项为已完成或未完成
- 按状态筛选待办事项（全部、未完成、已完成）
- 响应式设计，适配各种设备

## 项目结构

```
src/
├── assets/      # 静态资源文件
├── components/  # 可复用的Vue组件
│   ├── TodoList.vue
│   ├── TodoForm.vue
│   └── TodoItem.vue
├── router/      # Vue Router配置
├── stores/      # Pinia状态管理
│   └── todoStore.js
├── views/       # 页面级组件
│   ├── HomeView.vue
│   ├── ActiveView.vue
│   ├── CompletedView.vue
│   ├── AboutView.vue
│   └── TodoDetailView.vue
├── App.vue      # 应用根组件
├── main.js      # 应用入口文件
└── style.css    # 全局样式
```

## 开始使用

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 学习资源

- [Vue 3 官方文档](https://vuejs.org/)
- [Vue Router 4 文档](https://router.vuejs.org/)
- [Pinia 文档](https://pinia.vuejs.org/)
- [Vite 文档](https://vitejs.dev/guide/)
- [Vue 3 Composition API 文档](https://vuejs.org/guide/extras/composition-api-faq.html)
