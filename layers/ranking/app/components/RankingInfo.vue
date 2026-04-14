<script setup lang="ts">
defineProps<{
  player: PlayerStats;
}>();
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <UCard variant="solid" class="bg-primary text-white">
      <div class="mb-2 flex justify-between items-center">
        <p class="font-semibold text-lg">Partite</p>

        <UButton size="xs" color="dark">Vedi dettagli</UButton>
      </div>

      <BattlesShortSummary
        variant="primary"
        :win-rate="player.winRate"
        :wins="player.wins.length"
        :losses="player.losses.length"
        :ties="player.ties.length"
      />
    </UCard>

    <UCard variant="solid" class="bg-secondary text-white">
      <p class="font-semibold text-lg">Fazioni</p>

      <div v-for="faction in player.factions" variant="solid" class="mt-2">
        <p class="font-semibold mb-0.5">{{ faction.name }}</p>

        <BattlesShortSummary
          variant="secondary"
          :win-rate="faction.winRate"
          :wins="faction.wins"
          :losses="faction.losses"
          :ties="faction.ties"
        />
      </div>
    </UCard>
  </div>
</template>
