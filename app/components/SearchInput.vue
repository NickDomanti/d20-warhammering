<script setup lang="ts">
import type { InputProps } from '@nuxt/ui';

withDefaults(defineProps<InputProps>(), {
  placeholder: 'Cerca...',
});

const model = defineModel<string>({ required: true });
</script>

<template>
  <UInput
    variant="none"
    v-model="model"
    :icon="AppIcons.SEARCH"
    :placeholder
    class="w-full"
  >
    <template v-if="model.length" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="AppIcons.CIRCLE_X"
        aria-label="Clear input"
        @click="model = ''"
      />
    </template>
  </UInput>
</template>
