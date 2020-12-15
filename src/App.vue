<template>
  <div id="app">
    <el-scrollbar style="height:100%;height:100%;">
      <Dashboard></Dashboard>
    </el-scrollbar>
  </div>
</template>

<script>
import Dashboard from '@/views/Dashboard';
export default {
  name: 'App',
  components: { Dashboard },

};
</script>

<style lang="scss">
/* danger 删除按钮 */
.el-button--danger:focus,
.el-button--danger:hover {
  background-color: #ec4758;
  border-color: #ec4758;
  color: #ffffff;
}

.el-button--danger {
  background-color: #ed5565;
  border-color: #ed5565;
  color: #ffffff;
}
#app {
  height: 100vh;
  width: 100vw;
  .el-scrollbar__wrap {
    overflow-x: hidden; /*去除x轴滚动条*/
    white-space: nowrap; /*字体不换行，出现横向滚动条*/
  }
}
</style>
