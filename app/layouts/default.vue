<script setup lang="ts">
const route = useRoute();

const isHome = computed(() => route.path === '/');

const sizes = computed(() => `md:${isHome.value ? 400 : 200}px`);
</script>

<template>
  <UApp>
    <UContainer class="h-svh flex flex-col items-center gap-4 py-8" :class="{ 'justify-center': isHome }">
      <div class="flex flex-col items-center">
        <NuxtImg src="/img/d20.webp" :sizes />
        <NuxtImg src="/img/wh.webp" :sizes />
      </div>

      <UButton v-if="!isHome" to="/" size="sm" icon="material-symbols:arrow-left-alt-rounded">Torna alla Home</UButton>

      <slot />
    </UContainer>
  </UApp>
</template>
