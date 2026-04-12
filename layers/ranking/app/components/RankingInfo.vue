<script setup lang="ts">
defineProps<{
  player: PlayerStats;
}>();
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <RankingInfoCard title="Fazioni giocate">
      <div v-for="faction in player.factions" variant="solid" class="mt-4">
        <p class="font-semibold">
          {{ faction.name }} - WR {{ faction.winRate }}%
        </p>
        <p>
          {{ faction.wins }} vittoria/e &centerdot;
          {{ faction.losses }} sconfitta/e
        </p>
      </div>
    </RankingInfoCard>
  </div>
</template>
