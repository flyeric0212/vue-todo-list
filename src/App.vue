<script setup>
/**
 * App.vue 是应用的根组件
 * 在这里我们:
 * 1. 使用 RouterView 显示当前路由匹配的组件
 * 2. 使用 RouterLink 创建导航链接
 */
import { RouterView, RouterLink } from 'vue-router'

// 导入必要的 Vue 3 Composition API 函数
import { ref, computed, watch } from 'vue'

// 使用 ref 创建响应式数据
// todos 存储所有待办事项
const todos = ref([])
// newTodo 存储新待办事项的输入
const newTodo = ref('')

// 使用 computed 创建计算属性
// 计算未完成的待办事项数量
const remainingTodos = computed(() => {
  return todos.value.filter(todo => !todo.completed).length
})

// 计算所有待办事项是否都已完成
const allCompleted = computed({
  get: () => {
    return todos.value.length > 0 && todos.value.every(todo => todo.completed)
  },
  set: (value) => {
    todos.value.forEach(todo => {
      todo.completed = value
    })
  }
})

// 添加新的待办事项
const addTodo = () => {
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
  }
}

// 删除待办事项
const removeTodo = (id) => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

// 使用 watch 监听待办事项的变化
watch(todos, (newTodos) => {
  console.log('待办事项已更新:', newTodos)
}, { deep: true })
</script>

<template>
  <div class="container">
    <header>
      <h1>Vue 3 待办事项应用</h1>
      <!-- 导航菜单 -->
      <nav class="nav">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/active">未完成</RouterLink>
        <RouterLink to="/completed">已完成</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
      </nav>
    </header>

    <main>
      <!-- 路由视图，显示当前路由匹配的组件 -->
      <RouterView />
    </main>

    <footer>
      <p>使用 Vue 3 + Composition API + Vue Router + Pinia 构建</p>
    </footer>
  </div>
</template>

<style scoped>
header {
  margin-bottom: 20px;
}

h1 {
  color: var(--primary-color);
  margin-bottom: 15px;
}

footer {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  color: #666;
}
</style>
