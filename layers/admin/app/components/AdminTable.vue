<script setup lang="ts" generic="T extends TableData">
import type { TableData, TableProps, TableSlots } from '@nuxt/ui';

const props = defineProps<
  Omit<
    TableProps<T>,
    'loading' | 'loadingColor' | 'loadingAnimation' | 'sticky'
  > & {
    pending?: TableProps<T>['loading'];
    pendingColor?: TableProps<T>['loadingColor'];
    pendingAnimation?: TableProps<T>['loadingAnimation'];
  }
>();

defineSlots<TableSlots<T>>();

function mergeSlotClasses(k: keyof Required<TableProps>['ui'], fixed: string) {
  const passed = props.ui?.[k];
  if (passed) return `${fixed} ${passed}`;
  return fixed;
}

const ui = computed(() => {
  return {
    ...props.ui,
    td: mergeSlotClasses('td', 'text-white'),
    base: mergeSlotClasses('base', 'table-fixed'),
  };
});
</script>

<template>
  <UTable v-bind="$props" :loading="pending" :loading-color="pendingColor" :loading-animation="pendingAnimation" :ui
    class="w-full bg-night rounded-lg" sticky>
    <template v-for="(_, name) in $slots" #[name]="slotData">
      <slot :name v-bind="slotData" />
    </template>

    <template #loading>Caricamento</template>
    <template #empty>Nessun dato</template>
  </UTable>
</template>
