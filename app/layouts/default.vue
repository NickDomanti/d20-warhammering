<script setup lang="ts">
const route = useRoute();
</script>

<template>
  <UApp>
    <UContainer class="h-svh flex flex-col justify-center items-center gap-4">
      <Transition name="images" mode="out-in">
        <div :key="route.path" class="flex flex-col items-center">
          <NuxtImg src="/img/d20.webp" sizes="md:400px" preload />
          <NuxtImg src="/img/wh.webp" sizes="md:400px" preload />
        </div>
      </Transition>

      <slot />
    </UContainer>
  </UApp>
</template>

<style scoped>
.images-enter-active,
.images-leave-active {
  transition: transform 0.3s ease;
}

.images-enter-from,
.images-leave-to {
  transform: scale(0.95);
}
</style>
