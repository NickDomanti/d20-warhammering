<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <UCard variant="solid" class="bg-primary text-white">
    <p class="font-semibold text-lg">{{ title }}</p>

    <slot />
  </UCard>
</template>
