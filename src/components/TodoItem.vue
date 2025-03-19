<script setup>
/**
 * TodoItem 组件
 * 用于显示单个待办事项
 *
 * 组件通信:
 * 1. 通过 props 接收父组件传递的数据（单向数据流）
 * 2. 通过 defineEmits 定义自定义事件，向父组件传递信息（子到父通信）
 */
import { defineProps, defineEmits } from 'vue'

// 定义组件 props - 接收从父组件传递的数据
const props = defineProps({
  todo: {
    type: Object,
    required: true
  },
  // 是否显示详细信息按钮
  showDetails: {
    type: Boolean,
    default: true
  }
})

// 定义组件事件 - 用于向父组件发送消息
// 这是组件通信的重要方式之一
const emit = defineEmits(['toggle', 'remove', 'edit'])

// 切换待办事项完成状态
const toggleTodo = () => {
  emit('toggle', props.todo.id)
}

// 删除待办事项
const removeTodo = () => {
  emit('remove', props.todo.id)
}

// 编辑待办事项
const editTodo = () => {
  emit('edit', props.todo)
}
</script>

<template>
  <div class="todo-item" :class="{ 'is-completed': todo.completed }">
    <div class="todo-content">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="toggleTodo"
        class="todo-checkbox"
      />
      <span :class="{ completed: todo.completed }" class="todo-text">
        {{ todo.text }}
      </span>
    </div>

    <div class="todo-actions">
      <button @click="editTodo" class="btn-edit">编辑</button>
      <button @click="removeTodo" class="btn-delete">删除</button>
      <RouterLink
        v-if="showDetails"
        :to="`/todo/${todo.id}`"
        class="btn-details"
      >
        详情
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.todo-item:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.todo-item.is-completed {
  background-color: #f9f9f9;
}

.todo-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.todo-text {
  word-break: break-word;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.todo-checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.btn-edit, .btn-delete, .btn-details {
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;
}

.btn-edit {
  background-color: #4caf50;
  color: white;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-details {
  background-color: #2196f3;
  color: white;
  display: inline-block;
}
</style>