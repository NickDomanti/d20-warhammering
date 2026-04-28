<script setup lang="ts">
const props = defineProps<{ isHome?: boolean }>();

defineShortcuts({
  'meta_<': () => navigateTo('/admin'),
});
</script>

<template>
  <UContainer
    class="h-svh flex flex-col items-center gap-4 py-8"
    :class="{ 'justify-center': isHome }"
  >
    <HeaderLogos :small="!isHome" />

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
  </UContainer>
</template>
