<script setup lang="ts">
import {
  type CalendarDate,
  getLocalTimeZone,
  parseDate,
  today,
} from '@internationalized/date';
import type { Form, FormSubmitEvent } from '@nuxt/ui';
import InputDate from '~/components/InputDate.vue';

const props = defineProps<{
  state?: Battle;
}>();

const emit = defineEmits<{
  submit: [data: FormSubmitEvent<NewBattle>];
}>();

const isEditMode = computed(() => !!props.state?.id);

const getDefaultState = (): NewBattle =>
  props.state ?? {
    budget: 1000,
    date: today(getLocalTimeZone()).toString(),

    player1: '',
    player1Points: 0,
    player1Faction: '',

    player2: '',
    player2Points: 0,
    player2Faction: '',
  };

const state = ref<NewBattle>(getDefaultState());

const date = computed<CalendarDate>({
  get: () => parseDate(state.value.date),
  set: (val) => (state.value.date = val.toString()),
});

const toast = useToast();
const open = defineModel<boolean>('open', { default: false });

watch(open, (v) => {
  if (!v) return;

  // Reset form
  formStep.value = 'common';
  state.value = getDefaultState();
});

const submitting = ref(false);

async function onSubmit(event: FormSubmitEvent<NewBattle>) {
  submitting.value = true;

  const { success } = await fetchApi(
    '/api/battles' + (isEditMode.value ? `/${props.state!.id}` : ''),
    {
      method: isEditMode.value ? 'PUT' : 'POST',
      body: event.data,
    },
  );

  submitting.value = false;

  if (!success) return;

  toast.add({
    title: 'Partita registrata',
    color: 'success',
  });

  open.value = false;

  emit('submit', event);
}

const FORM_STEPS = ['common', 'player1', 'player2'] as const;
type FormStep = (typeof FORM_STEPS)[number];

const STEP_FIELDS: Record<FormStep, Exclude<keyof NewBattle, 'id'>[]> = {
  common: ['date', 'budget'],
  player1: ['player1', 'player1Faction', 'player1Points'],
  player2: ['player2', 'player2Faction', 'player2Points'],
};

const formStep = ref<FormStep>('common');

const uForm = useTemplateRef<Form<typeof battleSchema>>('uForm');

function prevStep() {
  uForm.value?.clear();

  formStep.value = FORM_STEPS[FORM_STEPS.indexOf(formStep.value) - 1]!;
}

async function nextStep() {
  try {
    await uForm.value?.validate({ name: STEP_FIELDS[formStep.value] });
  } catch {
    return;
  }

  formStep.value = FORM_STEPS[FORM_STEPS.indexOf(formStep.value) + 1]!;
}

const { data: playerStats } = useFetchApi('/api/player-stats');

const players = computed(() => playerStats.value?.map((s) => s.player));

function assumeFactionForPlayer(player: 1 | 2) {
  return (name: string) => {
    const playerStat = playerStats.value?.find((p) => p.player === name);
    const faction = playerStat?.factions[0];

    if (!faction) return;

    state.value[`player${player}Faction`] = faction.name;
  };
}

watch(() => state.value.player1, assumeFactionForPlayer(1));
watch(() => state.value.player2, assumeFactionForPlayer(2));
</script>

<template>
  <UModal
    v-model:open="open"
    title="Registra partita"
    :description="`La partità verrà ${isEditMode ? 'modificata nel' : 'aggiunta al'} database`"
    :ui="{ content: 'h-125' }"
  >
    <slot />

    <template #body>
      <UForm
        ref="uForm"
        :state
        :schema="battleSchema"
        class="flex flex-col gap-4 h-full"
        @submit="onSubmit"
      >
        <template v-if="formStep === 'common'">
          <UFormField label="Data partita" name="date">
            <InputDate v-model="date" />
          </UFormField>
          <UFormField label="Punti partita" name="budget">
            <USelect v-model="state.budget" :items="BUDGETS" class="w-50" />
          </UFormField>
        </template>

        <template v-else-if="formStep === 'player1'">
          <UFormField label="Tuo nome" name="player1">
            <BattleFormPlayerNameInput v-model="state.player1" :players />
          </UFormField>
          <UFormField label="Tua fazione" name="player1Faction">
            <USelectMenu
              v-model="state.player1Faction"
              :items="FACTIONS"
              class="w-50"
            />
          </UFormField>
          <UFormField label="Quanti punti hai fatto?" name="player1Points">
            <UInputNumber v-model="state.player1Points" class="w-50" />
          </UFormField>
        </template>

        <template v-else>
          <UFormField label="Nome avversario" name="player2">
            <BattleFormPlayerNameInput v-model="state.player2" :players />
          </UFormField>
          <UFormField label="Fazione avversario" name="player2Faction">
            <USelectMenu
              v-model="state.player2Faction"
              :items="FACTIONS"
              class="w-50"
            />
          </UFormField>
          <UFormField
            label="Quanti punti ha fatto l'avversario?"
            name="player2Points"
          >
            <UInputNumber v-model="state.player2Points" class="w-50" />
          </UFormField>
        </template>

        <div class="grow"></div>

        <USeparator />

        <div class="flex justify-end gap-2">
          <UButton
            v-if="formStep !== FORM_STEPS[0]"
            color="dark"
            icon="material-symbols:arrow-left-alt"
            @click="prevStep"
          >
            Indietro
          </UButton>

          <UButton
            v-if="formStep === FORM_STEPS.at(-1)"
            type="submit"
            trailing-icon="material-symbols:upload"
            :loading="submitting"
          >
            Invia
          </UButton>
          <UButton
            v-else
            color="dark"
            trailing-icon="material-symbols:arrow-right-alt"
            @click="nextStep"
          >
            Avanti
          </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
