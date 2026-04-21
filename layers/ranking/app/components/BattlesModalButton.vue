<script setup lang="ts">
defineProps<{
  stats: PlayerStats;
}>();
</script>

<template>
  <UModal :title="stats.player" description="Lista battaglie">
    <UButton color="dark">Vedi lista</UButton>

    <template #body>
      <div class="space-y-4">
        <BattleInfo v-for="battle of stats.battles" :player="stats.player" :battle />
      </div>
    </template>
  </UModal>
</template>
