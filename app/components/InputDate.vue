<script setup lang="ts">
import type { CalendarDate } from '@internationalized/date';
import type { InputDateEmits, InputDateProps } from '@nuxt/ui';

defineProps<InputDateProps>();
defineEmits<InputDateEmits>();

const model = defineModel<CalendarDate>();

const uInputDate = useTemplateRef('uInputDate');
</script>

<template>
  <UInputDate ref="uInputDate" v-model="model" class="w-50" v-bind="$attrs">
    <template #trailing>
      <UPopover :reference="uInputDate?.inputsRef[3]?.$el">
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          icon="lucide:calendar"
          aria-label="Seleziona una data"
          class="px-0"
        />

        <template #content>
          <UCalendar v-model="model" class="p-2" />
        </template>
      </UPopover>
    </template>
  </UInputDate>
</template>
