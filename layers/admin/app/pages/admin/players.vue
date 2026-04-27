<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'Gestione giocatori' });

const { data, pending: loading } = useFetchApi('/api/players');

const columns: TableColumn<Player>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    meta: { class: { td: 'font-semibold' } },
  },
  {
    id: 'actions',
    header: 'Azioni',
    meta: { class: { th: 'w-30 text-center' } },
  },
];
</script>

<template>
  <AdminTable :data :columns :loading>
    <template #actions-cell>
      <div class="flex justify-center gap-2">
        <UTooltip text="Modifica">
          <UButton color="dark" icon="material-symbols:edit" />
        </UTooltip>

        <UTooltip text="Elimina">
          <UButton color="dark" icon="material-symbols:delete" />
        </UTooltip>
      </div>
    </template>
  </AdminTable>
</template>
