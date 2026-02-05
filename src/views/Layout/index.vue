<script setup>
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutFixed from './components/LayoutFixed.vue';
import { useCategoryStore } from '@/stores/categoryStore';
import { onMounted } from 'vue';

const categoryStore = useCategoryStore()
onMounted(()=>categoryStore.getCategory())
</script>
<template>
  <LayoutFixed/>
  <LayoutNav></LayoutNav>
  <LayoutHeader></LayoutHeader>
  <!-- 添加key 破坏复用机制 强制销毁重建 -->
   <!-- <router-view :key="$route.fullPath"></router-view> -->
  <RouterView></RouterView>
  <LayoutFooter></LayoutFooter>
</template>