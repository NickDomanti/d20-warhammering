<script setup lang="ts">
defineProps<{
  stats: PlayerStats;
}>();
</script>

<template>
  <UModal :title="stats.player" description="Lista battaglie">
    <div class="flex sm:justify-end">
      <UButton color="dark">Vedi lista</UButton>
    </div>

    <template #body>
      <div class="flex flex-col gap-4">
        <BattleInfo
          v-for="battle of stats.battles"
          :player="stats.player"
          :battle
        />
      </div>
    </template>
  </UModal>
</template>
