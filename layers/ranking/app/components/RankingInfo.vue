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

        <UButton size="xs" color="secondary">Vedi dettagli</UButton>
      </div>

      <p>
        <span class="font-semibold">Totale:</span> {{ player.battles.length }}
      </p>
      <p><span class="font-semibold">Win Rate:</span> {{ player.winRate }}%</p>
      <p>
        <span class="font-semibold">Vittorie:</span> {{ player.wins.length }}
      </p>
      <p>
        <span class="font-semibold">Sconfitte:</span> {{ player.losses.length }}
      </p>
      <p>
        <span class="font-semibold">Pareggi:</span> {{ player.ties.length }}
      </p>
    </UCard>

    <UCard variant="solid" title="Fazioni" class="bg-secondary text-white">
      <p class="font-semibold text-lg">Fazioni</p>

      <div v-for="faction in player.factions" variant="solid" class="mt-2">
        <p>
          <span class="font-semibold">{{ faction.name }}</span> - WR
          {{ faction.winRate }}%
        </p>
        <p>
          {{ faction.wins }} vittoria/e &centerdot;
          {{ faction.losses }} sconfitta/e
        </p>
      </div>
    </UCard>
  </div>
</template>
