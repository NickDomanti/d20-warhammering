<script setup lang="ts">
import type { NuxtError } from '#app';

useHead({
  title: 'Error',
});

const props = defineProps<{ error: NuxtError }>();
</script>

<template>
  <UError
    :error
    :ui="{
      statusCode: 'text-white bg-primary px-2 py-1 rounded',
    }"
  />
</template>
