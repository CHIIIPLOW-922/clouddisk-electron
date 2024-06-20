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
  .header-component {
    width: 100%;
    /* 柔和的底部阴影 */
    box-shadow: 4px 4px 6px -4px rgba(0, 0, 0, 0.1);
  }

  .body {
    display: flex;
    flex-wrap: nowrap;
    margin-top: 10px;
    height: 100%;
    .aside-component {
      flex: 1 1 300px;
      min-width: 150px;
      max-width: 20%;
      height: 100%;
    }

    .main-component {
      flex: 2 1 0;
      height: 100%;
    }
  }
}
</style>
