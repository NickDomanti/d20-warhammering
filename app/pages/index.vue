<script setup lang="ts">
useHead({
  title: "D20 Warhammering",
});
</script>

<template>
  <UContainer class="h-svh flex flex-col justify-center items-center gap-4">
    <div>
      <NuxtImg src="/img/d20.webp" preload />
      <NuxtImg src="/img/wh.webp" preload />
    </div>

    <UButton>Classifica Lega</UButton>

    <UButton color="secondary">Registra partita</UButton>
  </UContainer>
</template>
