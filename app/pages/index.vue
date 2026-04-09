<script setup lang="ts">
useHead({
  title: 'Home',
});
</script>

<template>
  <div class="flex gap-4">
    <NuxtLink to="/ranking">
      <UButton size="xl">Classifica Lega</UButton>
    </NuxtLink>

    <UButton size="xl" color="secondary">Registra partita</UButton>
  </div>
</template>
