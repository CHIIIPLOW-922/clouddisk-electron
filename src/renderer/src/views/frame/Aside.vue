<template>
  <div class="aside">
    <div class="menu">
      <el-menu
        class="el-menu"
        text-color="#5882FA"
        active-text-color="#00BCD4"
        default-active="/all"
      >
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
        <el-progress
          :text-inside="true"
          :stroke-width="14"
          :percentage="usedSpaceRate"
          :color="customColors"
        />
        <div class="progress-ratio">{{ usedDiskSpace }}/{{ totalDiskSpace }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUsedDiskSpace } from '@/api/UserAPI';
import { getMenuList } from '@/constant/MenuList';
import { onMounted, ref } from 'vue';

const menuList = ref([])
const usedSpaceRate = ref(0)
const usedDiskSpace = ref('0B')
const totalDiskSpace = ref('0B')

const customColors = [
  { color: '#5882FA', percentage: 90 },
  { color: '#FE2E2E', percentage: 100 }
]

const getUserSpaceInfo = async () => {
  const response = await getUsedDiskSpace({
    showLoading : false,
    errorCallback: () => {}
  })
  if (response.code != 200) return
  usedSpaceRate.value = response.data.usedSpaceRate
  usedDiskSpace.value = response.data.usedDiskSpace
  totalDiskSpace.value = response.data.totalDiskSpace
}
onMounted(() => {
  menuList.value = getMenuList()
  getUserSpaceInfo()
})

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
        outline-offset: 1px solid #e6e6e6;
        .item-name {
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
