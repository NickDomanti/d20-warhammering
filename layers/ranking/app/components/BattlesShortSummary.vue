<script setup lang="ts">
const props = defineProps<{
  variant: 'primary' | 'secondary';
  wins: number;
  losses: number;
  ties: number;
  winRate: number;
}>();

const winRateColor = computed(() => {
  if (props.winRate >= 55) return 'success';
  if (props.winRate >= 45) return 'warning';
  return 'error';
});
</script>

<template>
  <div class="flex items-center gap-1">
    <UBadge color="dark" :class="`text-${winRateColor}`">
      {{ winRate }}%
    </UBadge>

    <UBadge color="dark" class="text-white">
      <span class="text-success">{{ wins }}</span> /
      <span class="text-error">{{ losses }}</span> /
      <span class="text-warning">{{ ties }}</span>
    </UBadge>
  </div>
</template>
