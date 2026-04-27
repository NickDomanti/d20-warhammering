<script setup lang="ts">
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
import type { FormSubmitEvent } from '@nuxt/ui';
import * as v from 'valibot';
import InputDate from '~/components/InputDate.vue';

const playerDataSchema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Questo sito non supporta l'anonimato")),
  faction: v.pipe(
    v.string(),
    v.nonEmpty('Si ma mi devi dire la fazione'),
    v.values(FACTIONS, 'Ma sta fazione mica esiste oh'),
  ),
  points: v.pipe(
    v.number('Bro i punti'),
    v.integer('Le virgole le metti altrove, solo numeri interi qui'),
    v.minValue(0, 'Meno di zero? Ma che schifo'),
    v.maxValue(100, 'Più di 100? È letteralmente impossibile'),
  ),
});

const formSchema = v.object({
  date: v.pipe(
    v.custom<CalendarDate>(
      (val) => val instanceof CalendarDate,
      'Ti sembra una data valida questa?',
    ),
    v.custom(
      (val) => (val as CalendarDate).compare(maxDate) <= 0,
      'Dubito che questa partita si sia svolta nel futuro',
    ),
  ),
  budget: v.pipe(v.number(), v.values(BUDGETS)),
  ownData: playerDataSchema,
  opponentData: playerDataSchema,
});

type FormSchema = v.InferOutput<typeof formSchema>;

const maxDate = today(getLocalTimeZone());

const state = shallowReactive<FormSchema>({
  date: maxDate,
  budget: 1000,
  ownData: {
    name: '',
    points: 0,
    faction: '',
  },
  opponentData: {
    name: '',
    points: 0,
    faction: '',
  },
});

const toast = useToast();
const open = defineModel<boolean>('open', { default: false });

async function onSubmit({
  data: { date, ...body },
}: FormSubmitEvent<FormSchema>) {
  const { success } = await fetchApi('/api/battles', {
    method: 'POST',
    body: {
      ...body,
      date: date.toDate(getLocalTimeZone()),
    },
  });

  if (!success) return;

  toast.add({
    title: 'Success',
    description: 'The form has been submitted.',
    color: 'success',
  });

  open.value = false;
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Registra partita"
    description="La partità verrà aggiunta al database"
  >
    <slot />

    <template #body>
      <UForm :state :schema="formSchema" class="space-y-4" @submit="onSubmit">
        <UFormField label="Data partita" name="date">
          <InputDate v-model="state.date" />
        </UFormField>

        <UFormField label="Punti partita" name="budget">
          <USelect v-model="state.budget" :items="BUDGETS" class="w-50" />
        </UFormField>

        <USeparator />

        <UFormField label="Tuo nome" name="ownData.name">
          <UInput v-model="state.ownData.name" class="w-50" />
        </UFormField>

        <UFormField label="Tua fazione" name="ownData.faction">
          <USelect
            v-model="state.ownData.faction"
            :items="FACTIONS"
            class="w-50"
          />
        </UFormField>

        <UFormField label="Quanti punti hai fatto?" name="ownData.points">
          <UInput type="number" v-model="state.ownData.points" class="w-50" />
        </UFormField>

        <USeparator />

        <UFormField label="Nome avversario" name="opponentData.name">
          <UInput v-model="state.opponentData.name" class="w-50" />
        </UFormField>

        <UFormField label="Fazione avversario" name="opponentData.faction">
          <USelect
            v-model="state.opponentData.faction"
            :items="FACTIONS"
            class="w-50"
          />
        </UFormField>

        <UFormField
          label="Quanti punti ha fatto l'avversario?"
          name="opponentData.points"
        >
          <UInput
            type="number"
            v-model="state.opponentData.points"
            class="w-50"
          />
        </UFormField>

        <USeparator />

        <UButton type="submit">Submit</UButton>
      </UForm>
    </template>
  </UModal>
</template>
