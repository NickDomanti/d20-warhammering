<script setup lang="ts">
useHead({
  title: 'Home',
});

definePageMeta({
  layout: {
    name: 'default',
    props: { isHome: true },
  },
});
</script>

<template>
  <div class="flex gap-4">
    <UButton to="/ranking" size="xl">Classifica Lega</UButton>

    <BattleFormModalButton />
  </div>
</template>
