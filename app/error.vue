<script setup lang="ts">
import type { NuxtError } from '#app';

useHead({
  title: 'Error',
});

const props = defineProps<{ error: NuxtError }>();
</script>

<template>
  <UError
    class="h-svh"
    :error
    :ui="{
      statusCode: 'text-lg text-white bg-secondary px-2 py-1 rounded',
    }"
  />
</template>
