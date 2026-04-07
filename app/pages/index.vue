<script setup lang="ts">
const { data: players } = await useFetch<Player[]>("/api/players");
</script>

<template>
  <div>Players: <NuxtLink to="/about">About Us</NuxtLink></div>

  <ul>
    <li v-for="player in players" :key="player.name">{{ player.name }}</li>
  </ul>
</template>
