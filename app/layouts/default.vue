<script setup lang="ts">
const props = defineProps<{ isHome?: boolean }>();
</script>

<template>
  <UApp>
    <UContainer
      class="h-svh flex flex-col items-center gap-4 py-8"
      :class="{ 'justify-center': isHome }"
    >
      <NuxtLink
        to="/"
        class="flex flex-col items-center"
        :class="isHome ? 'w-100' : 'w-50'"
      >
        <NuxtImg src="/img/d20.webp" />
        <NuxtImg src="/img/wh.webp" />
      </NuxtLink>

      <UButton
        v-if="!isHome"
        to="/"
        size="sm"
        icon="material-symbols:arrow-left-alt-rounded"
        color="dark"
      >
        Torna alla Home
      </UButton>

      <slot />
    </UContainer>
  </UApp>
</template>
