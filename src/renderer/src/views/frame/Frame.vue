<template>
  <div class="frame">
    <div class="header-component">
      <Header></Header>
    </div>
    <div class="body">
      <Aside class="aside-component"></Aside>
      <Main class="main-component"></Main>
    </div>
  </div>
</template>

<script setup>
import Aside from '@/views/frame/Aside.vue'
import Header from '@/views/frame/Header.vue'
import Main from '@/views/frame/Main.vue'

</script>

<style lang="scss">
.frame {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .header-component {
    width: 100%;
    box-shadow: 0 4px 6px -4px rgba(0, 0, 0, 0.1); /* 统一的柔和阴影 */
    z-index: 1; /* 确保阴影显示在其他元素之上 */
    margin-bottom: 5px;
  }

  .body {
    display: flex;
    flex: 1;
    overflow: hidden;

    .aside-component {
      flex: 0 0 300px;
      min-width: 250px;
      max-width: 20%;
      box-shadow: 2px -2px 6px rgba(0, 0, 0, 0.1); /* 右侧阴影 */
      height: 100%;
      overflow-y: auto;
      z-index: 2; /* 提升层级，确保阴影效果 */
      background-color: #fff; /* 背景颜色，增强阴影对比 */
    }

    .main-component {
      flex: 1;
      box-shadow: -2px -2px 6px rgba(0, 0, 0, 0.1); /* 左侧阴影 */
      height: 100%;
      overflow-y: auto;
      z-index: 1; /* 提升层级，确保阴影效果 */
      background-color: #fff; /* 背景颜色，增强阴影对比 */
    }
  }
}
</style>
