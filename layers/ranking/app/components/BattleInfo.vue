<script setup lang="ts">
const props = defineProps<{ player: string; battle: BattleStats }>();

const {
  value: [ownOutcome, opponentOutcome],
} = computed<[BattleOutcomes, BattleOutcomes]>(() => {
  const ownPoints = props.battle.ownData.points;
  const opponentPoints = props.battle.opponentData.points;

  if (ownPoints > opponentPoints)
    return [BattleOutcomes.WIN, BattleOutcomes.LOSS];
  if (ownPoints < opponentPoints)
    return [BattleOutcomes.LOSS, BattleOutcomes.WIN];
  return [BattleOutcomes.TIE, BattleOutcomes.TIE];
});
</script>

<template>
  <UCard
    variant="solid"
    :class="BATTLE_OUTCOMES[ownOutcome].colors.bg"
    :ui="{ body: 'px-3!' }"
  >
    <div class="flex flex-col gap-2">
      <div class="grid grid-cols-2 gap-2">
        <UBadge
          color="dark"
          size="lg"
          class="justify-center text-center col-span-2"
          :icon="BATTLE_OUTCOMES[ownOutcome].icon"
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
            <p :class="BATTLE_OUTCOMES[ownOutcome].colors.text">
              {{ battle.ownData.points }} VP
            </p>
          </div>
        </UBadge>

        <UBadge color="dark">
          <div class="w-full flex flex-col items-end text-end">
            <p>{{ battle.opponentData.faction }}</p>
            <p :class="BATTLE_OUTCOMES[opponentOutcome].colors.text">
              {{ battle.opponentData.points }} VP
            </p>
          </div>
        </UBadge>
      </div>
    </div>
  </UCard>
</template>
