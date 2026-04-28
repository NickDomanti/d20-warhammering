<script setup lang="ts">
defineProps<{
  small?: boolean;
}>();
</script>

<template>
  <NuxtLink
    to="/"
    class="flex flex-col justify-center items-center"
    :class="small ? 'w-30 md:w-50' : 'w-70'"
  >
    <NuxtImg src="/img/d20.webp" preload />
    <NuxtImg src="/img/wh.webp" preload />
  </NuxtLink>
</template>
