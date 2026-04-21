<script setup lang="ts">
useHead({
  title: 'Admin',
});

definePageMeta({
  layout: {
    name: 'admin',
    props: { isDashboard: true },
  },
});
</script>

<template>
  <UCard>
    <div class="space-y-4">
      <h1 class="text-xl text-center flex justify-center items-center gap-2">
        <UIcon name="material-symbols:settings" class="mt-0.5" />
        Admin Dashboard
      </h1>
      <div class="grid grid-cols-2 gap-4">
        <UButton to="/admin/battles" size="xl">Gestisci battaglie</UButton>
        <UButton to="/admin/players" size="xl" color="secondary">
          Gestisci giocatori
        </UButton>
      </div>
    </div>
  </UCard>
</template>
