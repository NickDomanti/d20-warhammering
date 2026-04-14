<script setup lang="ts">
defineProps<{
  stats: PlayerStats;
}>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <UCard variant="primary">
      <div class="mb-2 flex justify-between items-center">
        <p class="font-semibold text-lg">Partite</p>
      </div>

      <BattlesShortSummary
        variant="primary"
        :win-rate="stats.winRate"
        :wins="stats.wins.length"
        :losses="stats.losses.length"
        :ties="stats.ties.length"
      />

      <div class="flex justify-end">
        <BattlesModalButton :stats class="mt-3" />
      </div>
    </UCard>

    <UCard variant="secondary">
      <p class="font-semibold text-lg">Fazioni</p>

      <div class="sm:flex flex-wrap gap-x-6">
        <div v-for="faction in stats.factions" variant="solid" class="mt-2">
          <p class="font-semibold mb-0.5">{{ faction.name }}</p>
          <BattlesShortSummary
            variant="secondary"
            :win-rate="faction.winRate"
            :wins="faction.wins"
            :losses="faction.losses"
            :ties="faction.ties"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
