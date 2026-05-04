<script setup lang="ts">
const props = defineProps<{ isHome?: boolean }>();

defineShortcuts({
  'meta_<': () => navigateTo('/admin'),
});
</script>

<template>
  <UContainer
    class="h-svh flex flex-col items-center gap-4 pt-4 pb-10"
    :class="{ 'justify-center': isHome }"
  >
    <header>
      <NuxtLink
        to="/"
        class="flex flex-col justify-center items-center"
        :class="isHome ? 'w-70' : 'w-30 md:w-50'"
      >
        <NuxtImg src="/img/d20.webp" />
        <NuxtImg src="/img/wh.webp" />
      </NuxtLink>
    </header>

    <UButton
      v-if="!isHome"
      to="/"
      size="sm"
      icon="material-symbols:home"
      color="dark"
    >
      Home
    </UButton>

    <slot />

    <footer class="fixed bottom-2">
      <NuxtLink to="/privacy" class="text-xs text-muted hover:underline">
        Privacy Policy
      </NuxtLink>
    </footer>
  </UContainer>
</template>
