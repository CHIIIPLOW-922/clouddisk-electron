<template>
  <div class="header">
    <el-popover class="user-popover" placement="bottom" :width="300" trigger="hover">
      <p>用户账号：{{ userName }}</p>
      <p>用户昵称：{{ userNickname }}</p>
      <p>邮箱：{{ userEmail }}</p>
      <el-button class="edit-button" @click="editProfile()" link size="small" type="primary">编辑个人档案</el-button>
      <el-button class="logout-button custom-logout-button" link size="small" @click="logout()" type="danger">退出账号</el-button>
      <template #reference>
        <div class="avatar">
          <img v-if="!hasAvatar" class="user-avatar" src="@/assets/img/default_user_image.png" />
          <img v-if="hasAvatar" class="user-avatar-active" :src="userAvatar" />
          <p class="user-nickname">{{ userNickname }}</p>
        </div>
      </template>
    </el-popover>
  </div>
</template>

<script setup>
import { onMounted, ref, getCurrentInstance } from 'vue';
import { getUserInfo, userLogout } from '@/api/UserAPI';
import router from '@/router';
const { proxy } = getCurrentInstance()
const hasAvatar = ref(false)
const userAvatar = ref('')
const userEmail = ref('--')
const userName = ref('--')
const userNickname = ref('--')

/**
 * 获取用户信息
 * */
const getHeaderUserInfo = async () => {
  const response = await getUserInfo({
    showLoading: false,
    errorCallback: () => {
      hasAvatar.value = false
    }
  })
  if (response.code != 200) return
  userAvatar.value = response.data.userAvatarPath
  hasAvatar.value = userAvatar.value == null ? false : true
  userNickname.value = response.data.userNickname
  userName.value = response.data.username
  userEmail.value = response.data.email
}

/**
 * 退出账号
 *  */
const logout = async () => {
  // if (!flag) return
  const response = await userLogout({
    showLoading: false,
    errorCallback: () => { }
  })
  if (response.code != 200) return
  localStorage.removeItem('jwt')
  router.push("/login")
  proxy.MessageUtils.success('退出成功')
}

const editProfile = () => { }

onMounted(() => {
  getHeaderUserInfo()
})
</script>

<style lang="scss">
.logout-button {
  width: 150px;
  padding: 0px;
  color: #FE2E2E;
}


.header {
  display: flex;
  padding: 8px;



  .avatar {
    flex-direction: column;
    align-items: center;
    display: flex;
    justify-content: center;
    margin-left: 30px;
    margin-top: 10px;

    .user-nickname {
      margin-top: 10px;
      /* 调整图片与文字之间的间距 */
      font-size: 16px;
      /* 根据需要调整字体大小 */
      text-align: center;
      margin: 10px 0 0 0;
      white-space: nowrap;
      /* 防止文本换行 */
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13px;
      width: 70px;
    }

    .user-avatar {
      width: 50px;
      height: 50px;
      object-fit: cover;
    }

    .user-avatar-active {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
}
</style>