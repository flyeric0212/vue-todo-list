<script setup>
/**
 * 未完成任务视图组件
 *
 * 功能:
 * 1. 使用 Pinia 状态管理
 * 2. 过滤显示未完成的待办事项
 * 3. 演示组件复用
 */
import { onMounted, computed } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import TodoList from '../components/TodoList.vue'
import TodoForm from '../components/TodoForm.vue'

// 使用 Pinia store
const todoStore = useTodoStore()

// 组件挂载时设置过滤器为"active"
onMounted(() => {
  todoStore.updateFilter('active')
})

// 处理组件事件
const handleAddTodo = (text) => {
  todoStore.addTodo(text)
}

const handleToggleTodo = (id) => {
  todoStore.toggleTodo(id)
}

const handleRemoveTodo = (id) => {
  todoStore.removeTodo(id)
}

const handleEditTodo = (todo) => {
  const newText = prompt('编辑待办事项:', todo.text)
  if (newText && newText.trim() !== '' && newText !== todo.text) {
    const todoToUpdate = todoStore.todos.value.find(t => t.id === todo.id)
    if (todoToUpdate) {
      todoToUpdate.text = newText
    }
  }
}
</script>

<template>
  <div class="active-view">
    <h1>未完成待办事项</h1>

    <!-- 添加新待办事项表单 -->
    <TodoForm @add="handleAddTodo" />

    <!-- 待办事项列表，仅显示未完成的待办事项 -->
    <TodoList
      :todos="todoStore.filteredTodos"
      title="未完成待办事项"
      @toggle="handleToggleTodo"
      @remove="handleRemoveTodo"
      @edit="handleEditTodo"
    />

    <!-- 当没有未完成待办事项时显示的提示 -->
    <div v-if="todoStore.remainingCount === 0" class="empty-message card">
      <p>太棒了！你已完成所有待办事项！</p>
    </div>
  </div>
</template>

<style scoped>
.active-view h1 {
  color: var(--primary-color);
  margin-bottom: 20px;
}

.empty-message {
  text-align: center;
  padding: 30px;
  background-color: #e8f5e9;
  border-left: 4px solid var(--success-color);
}

.empty-message p {
  color: var(--success-color);
  font-size: 18px;
  font-weight: bold;
}
</style>