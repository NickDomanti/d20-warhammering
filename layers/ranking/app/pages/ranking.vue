<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

useHead({
  title: 'Classifica',
});

const { data: stats, pending } = useFetch<PlayerStats[]>('/api/player-stats');

const items = computed<(AccordionItem & PlayerStats)[]>(() =>
  (stats.value ?? [])
    .filter((s) => {
      if (!s.battles.length) return false;

      const searchTerm = searchInput.value.trim().toLowerCase();
      if (!searchTerm) return true;

      const playerMatch = s.player.toLowerCase().includes(searchTerm);
      if (playerMatch) return true;

      const factionMatch = s.factions.some((f) =>
        f.name.toLowerCase().includes(searchTerm),
      );
      if (factionMatch) return true;

      return false;
    })
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

const searchInput = ref('');
</script>

<template>
  <UCard v-if="pending">
    <div class="flex flex-col items-center justify-center gap-2">
      <UIcon name="svg-spinners:pulse-rings-multiple" class="size-25" />
      <p class="text-center text-semibold">Caricamento classifica...</p>
    </div>
  </UCard>

  <UCard
    v-else
    class="overflow-auto w-full"
    :ui="{ body: 'pt-0! pb-2! space-y-2' }"
  >
    <div
      class="sticky top-0 -mx-4 p-2 bg-night border-b border-b-accented z-10"
    >
      <UInput
        variant="none"
        v-model="searchInput"
        icon="material-symbols:search"
        placeholder="Cerca giocatore o fazione..."
        class="w-full"
      >
        <template v-if="searchInput.length" #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            icon="i-lucide-circle-x"
            aria-label="Clear input"
            @click="searchInput = ''"
          />
        </template>
      </UInput>
    </div>

    <UAccordion
      v-if="items.length"
      value-key="player"
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
        <RankingInfo :stats="item" :class="'ranking-' + index" />
      </template>
    </UAccordion>

    <p v-else class="text-muted text-sm text-center py-4">
      {{
        stats?.length
          ? 'La ricerca non ha prodotto risultati'
          : 'Nessun dato disponibile'
      }}
    </p>
  </UCard>
</template>
