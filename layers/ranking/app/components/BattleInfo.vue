<script setup lang="ts">
const props = defineProps<{ player: string; battle: BattleStats }>();

type Outcome = 'Vittoria' | 'Sconfitta' | 'Pareggio';

const {
  value: [ownOutcome, opponentOutcome],
} = computed<[Outcome, Outcome]>(() => {
  const ownPoints = props.battle.ownData.points;
  const opponentPoints = props.battle.opponentData.points;

  if (ownPoints > opponentPoints) return ['Vittoria', 'Sconfitta'];
  if (ownPoints < opponentPoints) return ['Sconfitta', 'Vittoria'];
  return ['Pareggio', 'Pareggio'];
});

const outcomeColorsMap = {
  Vittoria: { bg: 'bg-success-500', text: 'text-success-300' },
  Sconfitta: { bg: 'bg-error-500', text: 'text-error-300' },
  Pareggio: { bg: 'bg-warning-500', text: 'text-warning-300' },
};

const ownOutcomeColors = computed(() => outcomeColorsMap[ownOutcome]);
const opponentOutcomeColors = computed(() => outcomeColorsMap[opponentOutcome]);
</script>

<template>
  <UCard
    variant="solid"
    class="text-white"
    :class="ownOutcomeColors.bg"
    :ui="{ body: 'px-3!' }"
  >
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-2">
        <UBadge
          color="dark"
          size="lg"
          class="justify-center text-center col-span-2"
        >
          {{ ownOutcome }} contro {{ battle.opponentData.name }}
        </UBadge>

        <UBadge color="dark" class="justify-center">
          {{ battle.budget }}pts
        </UBadge>

        <UBadge color="dark" class="justify-center">{{
          formatDate(battle.date)
        }}</UBadge>

        <UBadge color="dark">
          <div class="flex flex-col">
            <p>{{ battle.ownData.faction }}</p>
            <p :class="ownOutcomeColors.text">{{ battle.ownData.points }} VP</p>
          </div>
        </UBadge>

        <UBadge color="dark">
          <div class="w-full flex flex-col items-end text-end">
            <p>{{ battle.opponentData.faction }}</p>
            <p :class="opponentOutcomeColors.text">
              {{ battle.opponentData.points }} VP
            </p>
          </div>
        </UBadge>
      </div>
    </div>
  </UCard>
</template>
