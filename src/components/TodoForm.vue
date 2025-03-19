<script setup>
/**
 * TodoForm 组件
 * 用于创建新的待办事项
 *
 * 组件通信:
 * 1. 通过 emit 发送添加事件到父组件
 */
import { ref } from 'vue'
import { defineEmits } from 'vue'

// 定义组件事件
const emit = defineEmits(['add'])

// 本地状态管理
const newTodo = ref('')

// 添加新的待办事项
const addTodo = () => {
  if (newTodo.value.trim()) {
    // 向父组件发送 add 事件，并传递待办事项文本
    emit('add', newTodo.value)
    // 清空输入框
    newTodo.value = ''
  }
}
</script>

<template>
  <div class="todo-form card">
    <h3>添加新待办事项</h3>

    <div class="form-input">
      <input
        v-model="newTodo"
        @keyup.enter="addTodo"
        placeholder="输入新待办事项..."
        type="text"
      />
      <button @click="addTodo">添加</button>
    </div>
  </div>
</template>

<style scoped>
.todo-form {
  margin-bottom: 20px;
}

h3 {
  margin-bottom: 15px;
  color: var(--primary-color);
}

.form-input {
  display: flex;
  gap: 10px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #3aa876;
}
</style>
