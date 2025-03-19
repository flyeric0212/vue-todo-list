<script setup>
/**
 * 关于页面组件
 * 展示应用信息
 */
</script>

<template>
  <div class="about-view">
    <div class="card">
      <h1>关于本应用</h1>

      <div class="about-content">
        <p>这是一个使用 Vue 3 Composition API 开发的待办事项应用。</p>

        <h2>技术栈</h2>
        <ul>
          <li><strong>Vue 3</strong> - 渐进式JavaScript框架</li>
          <li><strong>Composition API</strong> - Vue 3 的组合式 API</li>
          <li><strong>Vue Router</strong> - Vue.js 官方路由管理器</li>
          <li><strong>Pinia</strong> - Vue.js 的状态管理库</li>
          <li><strong>Vite</strong> - 下一代前端构建工具</li>
        </ul>

        <h2>主要功能</h2>
        <ul>
          <li>添加、编辑、删除待办事项</li>
          <li>将待办事项标记为已完成/未完成</li>
          <li>查看待办事项详情</li>
          <li>按状态筛选待办事项</li>
          <li>清除所有已完成的待办事项</li>
        </ul>

        <h2>组件通信方式</h2>
        <ul>
          <li><strong>Props 向下传递</strong> - 父组件向子组件传递数据</li>
          <li><strong>Events 向上传递</strong> - 子组件向父组件传递事件</li>
          <li><strong>Pinia 全局状态</strong> - 跨组件共享状态</li>
          <li><strong>Vue Router 路由参数</strong> - 通过 URL 传递参数</li>
          <li><strong>provide/inject</strong> - 深层组件嵌套时的数据传递</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-view {
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: var(--primary-color);
  margin-bottom: 20px;
}

h2 {
  color: var(--secondary-color);
  margin: 25px 0 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.about-content {
  line-height: 1.6;
}

p {
  margin-bottom: 15px;
}

ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

li {
  margin-bottom: 8px;
}

strong {
  color: var(--secondary-color);
}
</style>