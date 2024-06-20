<template>
  <div class="header">
    <div class="logo">
      <img v-show="!hasAvatar" class="user-avatar" src="@/assets/img/default_user_image.png" />
      <img v-show="hasAvatar" class="user-avatar" :src="userAvatar" />
      <p class="user-nickname">{{ defaultUserNickname }}</p>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue'
const userAvatar = ref('')
const hasAvatar = ref(false)
const defaultUserNickname = ref('defaultt')
</script>

<style lang="scss">
.header {
  display: flex;
  padding: 8px;

  .logo {
    flex-direction: column;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-left: 20px;
    margin-top: 10px;
    .user-nickname {
      margin-top: 10px; /* 调整图片与文字之间的间距 */
      font-size: 16px; /* 根据需要调整字体大小 */
      text-align: center;
      margin: 10px 0 0 0;
      white-space: nowrap; /* 防止文本换行 */
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13px;
      width: 70px;
    }
    .user-avatar {
      width: 50px;
      height: 50px;
    }
  }
}
</style>