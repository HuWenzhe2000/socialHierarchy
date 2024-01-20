<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="el-fade-in" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>

</style>