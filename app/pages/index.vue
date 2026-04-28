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
  <div class="flex flex-wrap justify-center gap-4">
    <UButton to="/ranking" size="xl" icon="material-symbols:trophy-outline">
      Classifica Lega
    </UButton>

    <BattleFormModal>
      <UButton
        size="xl"
        color="secondary"
        icon="material-symbols:swords-outline"
      >
        Registra partita
      </UButton>
    </BattleFormModal>
  </div>
</template>
