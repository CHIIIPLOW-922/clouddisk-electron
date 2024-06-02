<template>
  <div class="login-base">
    <img src="@/assets/img/right-logo.png" class="right-logo" />
    <div class="login-container">
      <img src="@/assets/img/logo.png" class="login-logo" />
      <h1>CloudDisk-Electron</h1>
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
        <el-form-item label="重新确认密码" prop="password">
          <el-input
            v-model.trim="registerform.repassword"
            clearable
            placeholder="请确认密码"
            type="password"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item class="register-button">
          <el-button type="primary" @click="register" >注册</el-button>
          <el-button @click="switchForm">有账号前往登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { Lock, User } from '@element-plus/icons-vue';
import { getCurrentInstance, nextTick, ref } from 'vue';
const { proxy } = getCurrentInstance()
const isLogin = ref(true)
const loginform = ref({})
const loginformRef = ref()
const registerform = ref({})
const registerformRef = ref()

const register = () => {
  proxy.MessageUtils.success('注册成功')
}

const login = () => {
  proxy.MessageUtils.success('登录成功')
}

const switchForm = () => {
  nextTick(() => {
    if (isLogin.value) {
      loginformRef.value.resetFields()
      loginform.value = {}
    } else {
      registerformRef.value.resetFields()
      registerform.value = {}
    }
    isLogin.value = !isLogin.value
  })
}
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
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-login {
  width: 100%;
}

.el-form-item {
  width: 100%;
}

.el-form-item__label {
  width: 100%;
}
.login-logo {
  width: 60px;
  height: 60px;
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
  margin-top: 40px;
}
.register-button {
  margin-top: 40px;
}
.bounce-enter-active,
.bounce-leave-active {
  transition: height 0.5s ease;
}

.bounce-enter,
.bounce-leave-to {
  height: 0;
  overflow: hidden;
}
</style>