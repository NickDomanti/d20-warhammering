<script setup lang="ts">
import { it } from '@nuxt/ui/locale';
</script>

<template>
  <UApp :locale="it" :tooltip="{ delayDuration: 0 }">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
