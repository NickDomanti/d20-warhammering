<script setup lang="ts">
import type { ButtonProps, ModalProps } from '@nuxt/ui';

withDefaults(
  defineProps<
    Pick<ModalProps, 'title' | 'description'> & {
      confirmText?: string;
      confirmColor?: ButtonProps['color'];
      confirmPending?: boolean;
    }
  >(),
  {
    title: 'Conferma',
    description: 'Confermi di procedere con questa operazione?',
  },
);

defineEmits<{
  confirm: [close: () => void];
}>();
</script>

<template>
  <UModal :title :description :ui="{ footer: 'justify-between' }">
    <slot />

    <template #footer="{ close }">
      <UButton color="dark" @click="close">Annulla</UButton>
      <UButton
        :color="confirmColor"
        :loading="confirmPending"
        @click="$emit('confirm', close)"
      >
        Conferma
      </UButton>
    </template>
  </UModal>
</template>
