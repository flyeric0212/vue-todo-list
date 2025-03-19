import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

/**
 * 使用Pinia实现待办事项的状态管理
 * defineStore用于创建一个store，接收两个参数：
 * 1. store的唯一ID
 * 2. 一个包含state, getters, actions的函数
 */
export const useTodoStore = defineStore('todo', () => {
  // 使用ref创建响应式状态（类似于组件中的data）
  const todos = ref([])
  const filter = ref('all') // 'all', 'active', 'completed'

  // 使用computed创建计算属性（类似于组件中的computed）
  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })

  const remainingCount = computed(() => {
    return todos.value.filter(todo => !todo.completed).length
  })

  const completedCount = computed(() => {
    return todos.value.filter(todo => todo.completed).length
  })

  // 定义actions（类似于组件中的methods）
  function addTodo(text) {
    if (text.trim()) {
      todos.value.push({
        id: Date.now(),
        text: text.trim(),
        completed: false,
        createdAt: new Date()
      })
    }
  }

  function removeTodo(id) {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  function toggleTodo(id) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  function updateFilter(newFilter) {
    filter.value = newFilter
  }

  function clearCompleted() {
    todos.value = todos.value.filter(todo => !todo.completed)
  }

  function toggleAll(completed) {
    todos.value.forEach(todo => {
      todo.completed = completed
    })
  }

  // 返回状态和操作方法，使其在组件中可访问
  return {
    // 状态
    todos,
    filter,
    // 计算属性
    filteredTodos,
    remainingCount,
    completedCount,
    // 操作方法
    addTodo,
    removeTodo,
    toggleTodo,
    updateFilter,
    clearCompleted,
    toggleAll
  }
})
