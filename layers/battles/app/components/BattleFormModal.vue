<script setup lang="ts">
import type { FormErrorEvent, FormSubmitEvent } from '@nuxt/ui';
import * as v from 'valibot';

const BUDGET_OPTIONS = [500, 1000, 1500, 2000];

const playerDataSchema = v.object({
  name: v.pipe(v.string()),
  points: v.pipe(
    v.number(),
    v.integer('Le virgole le metti altrove, solo numeri interi qui'),
    v.minValue(0, 'Meno di zero? Ma fai schifo'),
    v.maxValue(100, 'Più di 100? Non ci crede nessuno, fenomeno'),
  ),
  faction: v.pipe(
    v.string(),
    v.values(FACTIONS, 'Ma sta fazione mica esiste oh'),
  ),
});

const formSchema = v.object({
  date: v.string(),
  budget: v.pipe(v.number(), v.values(BUDGET_OPTIONS)),
  ownData: playerDataSchema,
  opponentData: playerDataSchema,
});

type FormSchema = v.InferOutput<typeof formSchema>;

const state = reactive<FormSchema>({
  date: '',
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
async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  toast.add({
    title: 'Success',
    description: 'The form has been submitted.',
    color: 'success',
  });

  console.log(event.data);
}

function onError(err: FormErrorEvent) {
  console.log(...err.errors);
}
</script>

<template>
  <UModal title="Registra partita" description="La partità verrà aggiunta al database">
    <slot />

    <template #body>
      <UForm :state :schema="formSchema" class="space-y-4" @submit="onSubmit" @error="onError">
        <UFormField label="Data partita" name="date">
          <UInput type="date" v-model="state.date" :items="BUDGET_OPTIONS" class="w-50" />
        </UFormField>

        <UFormField label="Punti partita" name="budget">
          <USelect v-model="state.budget" :items="BUDGET_OPTIONS" class="w-50" />
        </UFormField>

        <USeparator />

        <UFormField label="Tuo nome" name="ownData.name">
          <UInput v-model="state.ownData.name" class="w-50" />
        </UFormField>

        <UFormField label="Tua fazione" name="ownData.faction">
          <USelect v-model="state.ownData.faction" :items="FACTIONS" class="w-50" />
        </UFormField>

        <UFormField label="Quanti punti hai fatto?" name="ownData.points">
          <UInput type="number" v-model="state.ownData.points" class="w-50" />
        </UFormField>

        <USeparator />

        <UFormField label="Nome avversario" name="opponentData.name">
          <UInput v-model="state.opponentData.name" class="w-50" />
        </UFormField>

        <UFormField label="Fazione avversario" name="opponentData.faction">
          <USelect v-model="state.opponentData.faction" :items="FACTIONS" class="w-50" />
        </UFormField>

        <UFormField label="Quanti punti ha fatto l'avversario?" name="opponentData.points">
          <UInput type="number" v-model="state.opponentData.points" class="w-50" />
        </UFormField>

        <USeparator />

        <UButton type="submit">Submit</UButton>
      </UForm>
    </template>
  </UModal>
</template>
