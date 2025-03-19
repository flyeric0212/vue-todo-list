<script setup>
/**
 * TodoList 组件
 * 用于显示待办事项列表
 *
 * 组件通信:
 * 1. 从父组件接收 todos 数组
 * 2. 通过事件将用户操作传递给父组件
 * 3. 使用 TodoItem 子组件，实现父子组件通信
 */
import { defineProps, defineEmits } from 'vue'
import TodoItem from './TodoItem.vue'

// 从父组件接收数据
const props = defineProps({
  todos: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: '待办事项列表'
  }
})

// 定义向父组件发送的事件
const emit = defineEmits(['toggle', 'remove', 'edit', 'clear-completed'])

// 从子组件（TodoItem）接收事件并转发给父组件
const handleToggle = (id) => {
  emit('toggle', id)
}

const handleRemove = (id) => {
  emit('remove', id)
}

const handleEdit = (todo) => {
  emit('edit', todo)
}

const clearCompleted = () => {
  emit('clear-completed')
}
</script>

<template>
  <div class="todo-list-container">
    <div class="todo-list-header">
      <h2>{{ title }}</h2>
      <button v-if="todos.some(todo => todo.completed)" @click="clearCompleted" class="clear-btn">
        清除已完成
      </button>
    </div>

    <div v-if="todos.length === 0" class="empty-list">
      没有待办事项
    </div>

    <!-- 循环渲染子组件 -->
    <div v-else class="todo-items">
      <!--
        使用 TodoItem 组件 - 组件通信示例：
        1. :todo="todo" - 向子组件传递数据 (props)
        2. @toggle="handleToggle" - 监听子组件事件 (emit)
      -->
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="handleToggle"
        @remove="handleRemove"
        @edit="handleEdit"
      />
    </div>
  </div>
</template>

<style scoped>
.todo-list-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.todo-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.todo-list-header h2 {
  color: var(--primary-color);
  margin: 0;
}

.clear-btn {
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
}

.clear-btn:hover {
  background-color: #2c3e50;
}

.empty-list {
  text-align: center;
  color: #888;
  padding: 20px;
}

.todo-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
