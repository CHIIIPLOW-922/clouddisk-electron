<template>
  <div class="main">
    <div class="bread-crumb">
      <el-breadcrumb :separator-icon="CaretRight">
        <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
        <el-breadcrumb-item>promotion list</el-breadcrumb-item>
        <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup>
import { CaretRight } from '@element-plus/icons-vue';
</script>

<style lang="scss">
.main {
  padding: 8px;
  outline: 1px solid #e6e6e6;
  .bread-crumb{
    margin-left: 5px;
    margin-top: 10px;
    padding-left: 5px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e6e6e6;
  }
}
</style>