<script setup lang="ts">
import { parseDate, type CalendarDate } from '@internationalized/date';

const props = defineProps<{
  season?: NewSeason;
}>();

function getDefaultState(): NewSeason {
  if (props.season) return { ...props.season };
  return {
    name: '',
    description: '',
    coverImage: '',
  };
}

const state = ref(getDefaultState());

function resetForm() {
  state.value = getDefaultState();
}

const coverImage = ref<File>();

const startDate = computed<CalendarDate | undefined>({
  get: () =>
    state.value.startDate ? parseDate(state.value.startDate) : undefined,
  set: (val) => (state.value.startDate = val?.toString()),
});

const endDate = computed<CalendarDate | undefined>({
  get: () => (state.value.endDate ? parseDate(state.value.endDate) : undefined),
  set: (val) => (state.value.endDate = val?.toString()),
});

const isEditMode = computed(() => !!props.season?.name);
</script>

<template>
  <FormModal
    title="Registra stagione"
    :description="`La stagione verrà ${isEditMode ? 'modificata nel' : 'aggiunta al'} database`"
    :state
    :schema="seasonSchema"
    @open="resetForm"
  >
    <slot />

    <template #fields>
      <UFormField label="Nome" name="name">
        <UInput v-model="state.name" autofocus class="max-w-full w-75" />
      </UFormField>

      <UFormField label="Descrizione" name="description">
        <UTextarea
          v-model="state.description"
          :rows="5"
          autoresize
          class="max-w-full w-75"
        />
      </UFormField>

      <UFormField label="Immagine di copertina" name="coverImage">
        <UFileUpload
          v-model="coverImage"
          label="Droppa qui la foto"
          description="JPG, PNG, o WEBP"
          class="max-w-full w-75"
        />
      </UFormField>

      <UFormField label="Inizio (opzionale)" name="startDate">
        <InputDate v-model="startDate" class="w-50" />
      </UFormField>

      <UFormField label="Fine (opzionale)" name="endDate">
        <InputDate v-model="endDate" class="w-50" />
      </UFormField>
    </template>
  </FormModal>
</template>
