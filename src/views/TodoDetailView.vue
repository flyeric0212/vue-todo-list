<script setup>
/**
 * 待办事项详情页
 *
 * 功能:
 * 1. 使用 Vue Router 的动态路由功能
 * 2. 通过 props 接收路由参数
 * 3. 从 Pinia store 中查找对应的待办事项
 * 4. 提供详细信息和更多操作
 */
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useTodoStore } from '../stores/todoStore'

// 使用 Vue Router 和 Pinia
const router = useRouter()
const todoStore = useTodoStore()

// 通过 props 接收路由参数
// 这里演示了 Vue Router 的 props 传递功能
const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

// 在状态管理中查找对应的待办事项
const todo = computed(() => {
  const id = parseInt(props.id)
  return todoStore.todos.value.find(todo => todo.id === id)
})

// 本地状态
const isEditing = ref(false)
const editedText = ref('')

// 组件挂载时执行
onMounted(() => {
  // 如果找不到对应的待办事项，返回首页
  if (!todo.value) {
    router.push('/')
  } else {
    editedText.value = todo.value.text
  }
})

// 编辑待办事项
const startEditing = () => {
  isEditing.value = true
  editedText.value = todo.value.text
}

const saveEdit = () => {
  if (editedText.value.trim() && editedText.value !== todo.value.text) {
    todo.value.text = editedText.value.trim()
  }
  isEditing.value = false
}

const cancelEdit = () => {
  isEditing.value = false
  editedText.value = todo.value.text
}

// 删除并返回
const deleteAndReturn = () => {
  todoStore.removeTodo(parseInt(props.id))
  router.push('/')
}

// 切换完成状态
const toggleComplete = () => {
  todoStore.toggleTodo(parseInt(props.id))
}

// 格式化日期
const formatDate = (date) => {
  if (!date) return '未知时间'
  return new Date(date).toLocaleString()
}
</script>

<template>
  <div v-if="todo" class="todo-detail">
    <div class="card detail-card">
      <div class="detail-header">
        <h1>任务详情</h1>
        <div class="status-badge" :class="{ 'is-completed': todo.completed }">
          {{ todo.completed ? '已完成' : '未完成' }}
        </div>
      </div>

      <!-- 显示待办事项内容或编辑表单 -->
      <div v-if="!isEditing" class="detail-content">
        <h2 :class="{ completed: todo.completed }">{{ todo.text }}</h2>
        <div class="detail-meta">
          <p>创建时间: {{ formatDate(todo.createdAt) }}</p>
          <p>ID: {{ todo.id }}</p>
        </div>
      </div>

      <!-- 编辑表单 -->
      <div v-else class="edit-form">
        <input
          v-model="editedText"
          @keyup.enter="saveEdit"
          type="text"
          class="edit-input"
        >
        <div class="edit-actions">
          <button @click="saveEdit" class="save-btn">保存</button>
          <button @click="cancelEdit" class="cancel-btn">取消</button>
        </div>
      </div>

      <!-- 操作按钮区 -->
      <div class="detail-actions">
        <button
          v-if="!isEditing"
          @click="startEditing"
          class="edit-btn"
        >
          编辑
        </button>
        <button
          @click="toggleComplete"
          :class="todo.completed ? 'incomplete-btn' : 'complete-btn'"
        >
          {{ todo.completed ? '标记为未完成' : '标记为已完成' }}
        </button>
        <button @click="deleteAndReturn" class="delete-btn">
          删除
        </button>
      </div>

      <!-- 返回链接 -->
      <div class="back-link">
        <RouterLink to="/">返回待办事项列表</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-detail {
  max-width: 700px;
  margin: 0 auto;
}

.detail-card {
  padding: 25px;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.detail-header h1 {
  color: var(--primary-color);
  margin: 0;
}

.status-badge {
  padding: 5px 12px;
  border-radius: 20px;
  background-color: var(--warning-color);
  color: white;
  font-weight: bold;
  font-size: 14px;
}

.status-badge.is-completed {
  background-color: var(--success-color);
}

.detail-content {
  margin-bottom: 25px;
}

.detail-content h2 {
  font-size: 24px;
  margin-bottom: 15px;
  word-break: break-word;
}

.detail-meta {
  color: #666;
  font-size: 14px;
}

.detail-meta p {
  margin: 5px 0;
}

.edit-form {
  margin-bottom: 20px;
}

.edit-input {
  width: 100%;
  padding: 12px;
  font-size: 18px;
  margin-bottom: 10px;
}

.edit-actions {
  display: flex;
  gap: 10px;
}

.detail-actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.edit-btn {
  background-color: var(--primary-color);
}

.complete-btn {
  background-color: var(--success-color);
}

.incomplete-btn {
  background-color: var(--warning-color);
}

.delete-btn {
  background-color: var(--danger-color);
}

.save-btn {
  background-color: var(--success-color);
}

.cancel-btn {
  background-color: var(--secondary-color);
}

.back-link {
  margin-top: 20px;
  text-align: center;
}

.back-link a {
  color: var(--primary-color);
  text-decoration: none;
}

.back-link a:hover {
  text-decoration: underline;
}
</style>