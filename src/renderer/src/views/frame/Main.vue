<template>
  <div class="main">
    <div class="main-breadcrumb">
      <div class="bread-crumb">
        <el-breadcrumb :separator-icon="CaretRight">
          <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
          <el-breadcrumb-item>promotion list</el-breadcrumb-item>
          <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="right-button">
        <el-button class="grid-button" :icon="Grid" type="text" @click="test()" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { CaretRight, Grid } from '@element-plus/icons-vue';
import { getCurrentInstance } from 'vue';
const {proxy} = getCurrentInstance()
const test = ()=>{
  const response = proxy.$http.get("/user/test")
  console.log(response)
}
</script>

<style lang="scss">
.main {
  padding: 8px;
  outline: 1px solid #e6e6e6;
  .main-breadcrumb {
    margin-left: 5px;
    margin-top: 10px;
    padding-left: 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    .bread-crumb {
      flex: 1;
    }
    .right-button{
        .grid-button{
          height: 15px;
          width: 15px;
          margin-right: 10px;
        }

    }
  }
}
</style>
