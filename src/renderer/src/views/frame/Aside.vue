<template>
  <div class="aside">
    <div class="menu">
      <el-menu class="el-menu" text-color="#5882FA" active-text-color="#00BCD4" default-active="/all">
        <el-menu-item class="menu-item" v-for="item in menuList" :key="item.id" :index="item.path">
          <template #title>
            <el-icon :size="15">
              <component :is="item.icon"></component>
            </el-icon>
            <span class="item-name">{{ item.name }}</span>
          </template>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="disk-space">
      <div class="disk-space-progress">
        <div class="progress-static-text">磁盘空间还有</div>
        <el-progress :text-inside="true" :stroke-width="14" :percentage="90" :color="customColors" />
        <div class="progress-ratio">1G/1T</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getMenuList } from '@/constant/MenuList';
import { onMounted, ref } from 'vue';

const menuList = ref([]);

const customColors = [
  { color: '#5882FA', percentage: 90 },
  { color: '#FE2E2E', percentage: 100 },
]

onMounted(() => {
  menuList.value = getMenuList();
});

</script>

<style lang="scss">
.aside {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 8px;

  .menu {
    flex: 1;

    .el-menu {
      border: 0;

      .menu-item {
        height: 45px;
        box-shadow: 4px 4px 6px -4px rgba(0, 0, 0, 0.1);
        outline-offset: 1px solid #E6E6E6;
        .item-name{
          font-size: 12px;
        }
      }
    }
  }

  .disk-space {
    margin-top: auto;
    padding: 5px;
    margin-bottom: 10px;

    .disk-space-progress {
      .progress-static-text{
        font-size: 15px;
        margin-bottom: 5px;
      }
      

      .el-progress {
        
      }

      .progress-ratio {
        margin-top: 5px;
        font-size: 15px;
      }
    }
  }
}
</style>