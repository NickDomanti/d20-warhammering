<script setup lang="ts">
const { data: playerStats, refresh } =
  await useFetch<PlayerStats[]>("/api/player-stats");
</script>

<template>
  <div>Players: <a href="" @click.prevent="() => refresh()">Refresh</a></div>

  <ul>
    <li v-for="stats in playerStats" :key="stats.player">{{ stats.player }}</li>
  </ul>
</template>
