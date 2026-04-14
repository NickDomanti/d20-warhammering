<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

useHead({
  title: 'Classifica',
});

const { data: stats, pending } = useFetch<PlayerStats[]>('/api/player-stats');

const items = computed<(AccordionItem & PlayerStats)[]>(() =>
  (stats.value ?? [])
    .filter((s) => s.battles.length)
    .map((s) => ({ ...s, label: s.player })),
);

async function scrollIntoAccordionItem(indexStr?: string | string[]) {
  const index = +indexStr!;
  if (Number.isNaN(index)) return;

  await delay(50);

  document
    .querySelector('.ranking-' + index)
    ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
</script>

<template>
  <UCard
    v-if="items.length"
    class="overflow-auto w-full"
    :ui="{ body: '!py-2' }"
  >
    <UAccordion
      :items
      :unmount-on-hide="false"
      :ui="{ label: 'text-lg truncate' }"
      @update:model-value="scrollIntoAccordionItem"
    >
      <template #leading="{ index }">
        <UIcon
          v-if="index < 3"
          name="material-symbols:trophy"
          size="28px"
          class="shrink-0"
          :class="['text-amber-300', 'text-blue-200', 'text-amber-500'][index]"
        />
        <span class="text-lg" v-else>{{ index + 1 }}.</span>
      </template>

      <template #body="{ item, index }">
        <RankingInfo :player="item" :class="'ranking-' + index" />
      </template>
    </UAccordion>
  </UCard>

  <UCard v-else>
    <div v-if="pending" class="flex flex-col items-center justify-center gap-2">
      <UIcon name="svg-spinners:pulse-rings-multiple" class="size-25" />
      <p class="text-center text-semibold">Caricamento classifica...</p>
    </div>

    <p v-else>Nessun dato disponibile</p>
  </UCard>
</template>
