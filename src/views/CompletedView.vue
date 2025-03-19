<script setup>
/**
 * 已完成任务视图组件
 *
 * 功能:
 * 1. 使用 Pinia 状态管理
 * 2. 过滤显示已完成的待办事项
 * 3. 提供清除所有已完成任务的功能
 */
import { onMounted } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import TodoList from '../components/TodoList.vue'

// 使用 Pinia store
const todoStore = useTodoStore()

// 组件挂载时设置过滤器为"completed"
onMounted(() => {
  todoStore.updateFilter('completed')
})

// 处理组件事件
const handleToggleTodo = (id) => {
  todoStore.toggleTodo(id)
}

const handleRemoveTodo = (id) => {
  todoStore.removeTodo(id)
}

const handleClearCompleted = () => {
  todoStore.clearCompleted()
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
  <div class="completed-view">
    <h1>已完成待办事项</h1>

    <!-- 已完成任务操作区 -->
    <div class="actions card" v-if="todoStore.completedCount > 0">
      <p>您已完成 {{ todoStore.completedCount }} 个任务</p>
      <button @click="handleClearCompleted" class="clear-btn">
        清除所有已完成任务
      </button>
    </div>

    <!-- 待办事项列表，仅显示已完成的待办事项 -->
    <TodoList
      :todos="todoStore.filteredTodos"
      title="已完成待办事项"
      @toggle="handleToggleTodo"
      @remove="handleRemoveTodo"
      @edit="handleEditTodo"
      @clear-completed="handleClearCompleted"
    />

    <!-- 当没有已完成待办事项时显示的提示 -->
    <div v-if="todoStore.completedCount === 0" class="empty-message card">
      <p>您还没有完成任何待办事项</p>
    </div>
  </div>
</template>

<style scoped>
.completed-view h1 {
  color: var(--primary-color);
  margin-bottom: 20px;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 20px;
  background-color: #f5f5f5;
}

.actions p {
  font-weight: bold;
  color: var(--secondary-color);
}

.clear-btn {
  background-color: var(--danger-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.clear-btn:hover {
  background-color: #d32f2f;
}

.empty-message {
  text-align: center;
  padding: 30px;
  background-color: #f5f5f5;
  border-left: 4px solid var(--secondary-color);
}

.empty-message p {
  color: var(--secondary-color);
  font-size: 18px;
  font-weight: bold;
}
</style>