<template>
  <div class="login-base">
    <img src="@/assets/img/right-logo.png" class="right-logo" />
    <div class="login-container">
      <img src="@/assets/img/logo.png" class="login-logo" />
      <h2 class="login-title">CloudDisk-Electron</h2>
      <el-form
        v-show="isLogin"
        ref="loginformRef"
        :model="loginform"
        :rules="rules"
        class="el-login"
        label-position="top"
        key="login"
        @keyup.enter="login"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model.trim="loginform.username"
            clearable
            placeholder="请输入账号"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="loginform.password"
            clearable
            placeholder="请输入密码"
            type="password"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="main-captcha"
          label="验证码"
          prop="captcha"
          v-if="authStore.showCaptcha"
        >
          <el-input
            class="captcha"
            v-model.trim="loginform.captcha"
            clearable
            placeholder="请输入验证码"
            :prefix-icon="FolderChecked"
          ></el-input>
          <img :src="captchaSrc" @click="changeCode()" />
        </el-form-item>
        <el-form-item class="login-button">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button @click="switchForm">去注册</el-button>
        </el-form-item>
      </el-form>
      <el-form
        v-show="!isLogin"
        ref="registerformRef"
        :model="registerform"
        :rules="rules"
        class="el-login"
        label-position="top"
        label-width="100px"
        key="register"
        @keyup.enter="register"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model.trim="registerform.username"
            clearable
            placeholder="请输入账号"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model.trim="registerform.password"
            clearable
            placeholder="请输入密码"
            type="password"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item label="重新确认密码" prop="repassword">
          <el-input
            v-model.trim="registerform.repassword"
            clearable
            placeholder="请确认密码"
            type="password"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item label="注册邮箱" prop="email">
          <el-input
            v-model.trim="registerform.email"
            clearable
            placeholder="请输入注册邮箱"
            :prefix-icon="Box"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱验证码" prop="emailValidCode" class="main-emailCode">
          <el-input
            class="emailCode"
            v-model.trim="registerform.emailValidCode"
            clearable
            placeholder="请输入邮箱验证码"
            type="email"
            :prefix-icon="ScaleToOriginal"
          ></el-input>
          <el-button @click="sendEmailValidCode" :disabled="emailCodeFlag">{{
            sendEmailStatus
          }}</el-button>
        </el-form-item>
        <el-form-item class="register-button">
          <el-button type="primary" @click="register">注册</el-button>
          <el-button @click="switchForm">有账号前往登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { generateCaptcha, userLogin, sendEmail, userRegister } from '@/api/UserAPI'
import { useAuthStore } from '@/stores/LoginStores'
import { Box, FolderChecked, Lock, ScaleToOriginal, User } from '@element-plus/icons-vue'
import { dataType } from 'element-plus/es/components/table-v2/src/common.mjs';
import { getCurrentInstance, nextTick, onMounted, ref } from 'vue'
const { proxy } = getCurrentInstance()
const isLogin = ref(true)
const loginform = ref({})
const loginformRef = ref()
const registerform = ref({})
const registerformRef = ref()
const authStore = useAuthStore()
const sendEmailStatus = ref('发送验证码')
const emailCodeFlag = ref(false)
const captchaSrc = ref('')

const register = async () => {
  let params = {}
  Object.assign(params, registerform.value)
  if (Object.keys(params).length == 0) {
    proxy.MessageUtils.error("注册信息不能为空")
    return
  }
  const response = await userRegister(params, {
    dataType: 'json',
    errorCallback: () => {
      return
    }
  })
  proxy.MessageUtils.success(response.msg)
}

const login = async () => {
  let params = {}
  Object.assign(params, loginform.value)
  if (Object.keys(params).length == 0) {
    authStore.incrementFailedAttempts()
    proxy.MessageUtils.error('登录信息不能为空')
    changeCode()
    return
  }
  params.showCaptcha = authStore.showCaptcha
  const response = await userLogin(params, {
    dataType: 'json',
    errorCallback: () => {
      authStore.incrementFailedAttempts()
      changeCode()
      return
    }
  })
  proxy.MessageUtils.success(response.msg)
}

const switchForm = () => {
  nextTick(() => {
    if (isLogin.value) {
      loginformRef.value.resetFields()
      loginform.value = {}
    } else {
      changeCode()
      registerformRef.value.resetFields()
      registerform.value = {}
    }
    isLogin.value = !isLogin.value
  })
}

const sendEmailValidCode = async () => {
  let count = 60
  let timer
  // 开始倒计时
  if (emailCodeFlag.value) return
  const response = await sendEmail(
    { email: registerform.value.email },
    {
      dataType: 'json',
      errorCallback: () => {
        return
      }
    }
  )
  proxy.MessageUtils.success(response.msg)
  emailCodeFlag.value = true
  sendEmailStatus.value = count + '秒后重试'

  timer = setInterval(() => {
    count--
    sendEmailStatus.value = count + '秒后重试'
    if (count <= 0) {
      clearInterval(timer)
      emailCodeFlag.value = false
      sendEmailStatus.value = '发送验证码'
    }
  }, 1000)
}

const changeCode = async () => {
  if (authStore.showCaptcha) {
    const response = await generateCaptcha()
    captchaSrc.value = response.data
  }
}

onMounted(() => {
  // changeCode()
})
</script>

<style>
.login-base {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #fafafa;
}

.login-container {
  margin-right: 5%;
  width: 400px;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-title {
  margin-top: 0px;
  margin-bottom: 5px;
}

.el-login {
  width: 100%;
}

.el-form-item {
  width: 100%;
}

.el-form-item__label {
  width: 100%;
  margin-bottom: 1px !important;
}
.login-logo {
  width: 55px;
  height: 55px;
  z-index: 99;
}
.right-logo {
  width: 400px;
  max-height: 100%;
  max-width: 100%;
  margin-right: 50px;
  margin-left: 50px;
  margin-bottom: 50px;
  z-index: 99;
}
.login-button {
  margin-top: 30px;
}
.register-button {
  margin-top: 30px;
}
.main-captcha {
  display: flex;
}
.captcha {
  width: 58%;
}
.main-emailCode {
  display: flex;
}
.emailCode {
  width: 60%;
  flex: 1;
  margin-right: 10px;
}
</style>