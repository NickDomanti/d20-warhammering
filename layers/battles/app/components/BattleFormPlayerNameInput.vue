<script setup lang="ts">
defineProps<{ players?: string[] }>();

const model = defineModel<string>();
</script>

<template>
  <UInputMenu
    v-model="model"
    :items="players"
    :trailing-icon="false"
    :content="{ hideWhenEmpty: true }"
    autocomplete
    class="w-50"
  />
</template>
