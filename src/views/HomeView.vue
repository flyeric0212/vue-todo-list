<script setup>
/**
 * 首页视图组件
 *
 * 功能:
 * 1. 使用 Pinia 状态管理
 * 2. 组合多个子组件
 * 3. 实现组件间通信
 */
import { onMounted } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import TodoForm from '../components/TodoForm.vue'
import TodoList from '../components/TodoList.vue'

// 使用 Pinia store
const todoStore = useTodoStore()

// 在组件挂载时可以执行一些初始化操作
onMounted(() => {
  console.log('首页视图组件已挂载')
  todoStore.updateFilter('all')
})

// 处理子组件发出的事件
const handleAddTodo = (text) => {
  todoStore.addTodo(text)
}

const handleToggleTodo = (id) => {
  todoStore.toggleTodo(id)
}

const handleRemoveTodo = (id) => {
  todoStore.removeTodo(id)
}

const handleClearCompleted = () => {
  todoStore.clearCompleted()
}

// 示例：如何处理编辑待办事项
// 这是组件间通信的另一种形式
const handleEditTodo = (todo) => {
  const newText = prompt('编辑待办事项:', todo.text)
  if (newText && newText.trim() !== '' && newText !== todo.text) {
    // 在真实应用中，这里应该有一个更新待办事项的方法
    // 这里仅作演示
    const todoToUpdate = todoStore.todos.value.find(t => t.id === todo.id)
    if (todoToUpdate) {
      todoToUpdate.text = newText
    }
  }
}
</script>

<template>
  <div class="home-view">
    <h1>全部待办事项</h1>

    <!-- 添加新待办事项表单组件 -->
    <TodoForm @add="handleAddTodo" />

    <!-- 待办事项统计 -->
    <div class="todo-stats card" v-if="todoStore.todos.length > 0">
      <div class="stat-item">
        <span>总任务:</span>
        <strong>{{ todoStore.todos.length }}</strong>
      </div>
      <div class="stat-item">
        <span>待完成:</span>
        <strong>{{ todoStore.remainingCount }}</strong>
      </div>
      <div class="stat-item">
        <span>已完成:</span>
        <strong>{{ todoStore.completedCount }}</strong>
      </div>
      <label class="toggle-all">
        <input
          type="checkbox"
          :checked="todoStore.remainingCount === 0 && todoStore.todos.length > 0"
          @change="todoStore.toggleAll(!todoStore.remainingCount === 0)"
        >
        全部完成
      </label>
    </div>

    <!-- 待办事项列表组件 -->
    <TodoList
      :todos="todoStore.filteredTodos"
      title="所有待办事项"
      @toggle="handleToggleTodo"
      @remove="handleRemoveTodo"
      @edit="handleEditTodo"
      @clear-completed="handleClearCompleted"
    />
  </div>
</template>

<style scoped>
.home-view h1 {
  color: var(--primary-color);
  margin-bottom: 20px;
}

.todo-stats {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 20px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-item strong {
  color: var(--primary-color);
  font-size: 18px;
}

.toggle-all {
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}

.toggle-all input {
  margin: 0;
}
</style>