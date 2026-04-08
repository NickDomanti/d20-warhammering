<script setup lang="ts">
useHead({
  title: "Classifica",
});

const { data: stats } = useFetch<PlayerStats[]>("/api/player-stats");
</script>

<template>
  <ul>
    <li v-for="s of stats">{{ s.player }}</li>
  </ul>
</template>
