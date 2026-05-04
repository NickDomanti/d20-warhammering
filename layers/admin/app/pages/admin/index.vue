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
        <UIcon :name="AppIcons.SETTINGS" class="mt-0.5" />
        Admin Dashboard
      </h1>

      <div class="grid grid-cols-2 gap-4 *:justify-center">
        <UButton to="/admin/battles" size="xl" color="dark">Partite</UButton>

        <UButton to="/admin/players" size="xl" color="dark">
          Giocatori
        </UButton>

        <UButton to="/admin/seasons" size="xl" color="dark">Stagioni</UButton>

        <UButton to="/admin/categories" size="xl" color="dark">
          Categorie
        </UButton>
      </div>
    </div>
  </UCard>
</template>
