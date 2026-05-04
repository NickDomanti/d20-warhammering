<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'Gestione stagioni' });

const { data, pending: loading } = useFetchApi('/api/seasons');

const columns: TableColumn<Season>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
    meta: { class: { td: 'font-semibold' } },
  },
  {
    accessorKey: 'startDate',
    header: 'Inizio',
    meta: { class: { th: 'w-30' } },
  },
  {
    accessorKey: 'endDate',
    header: 'Fine',
    meta: { class: { th: 'w-30' } },
  },
  {
    id: 'actions',
    header: 'Azioni',
    meta: { class: { th: 'w-30 text-center' } },
  },
];
</script>

<template>
  <AdminTable :data :columns :loading searchable>
    <template #body-bottom>
      <tr>
        <td colspan="4" class="p-4">
          <div class="flex justify-end">
            <UButton :icon="AppIcons.GLOBE">Crea nuova stagione</UButton>
          </div>
        </td>
      </tr>
    </template>

    <template #expanded="{ row }">
      {{ row.original.description }}
    </template>

    <template #actions-cell>
      <div class="flex justify-center gap-2">
        <UTooltip text="Modifica">
          <UButton color="dark" :icon="AppIcons.EDIT" />
        </UTooltip>
        <UTooltip text="Elimina">
          <UButton color="dark" :icon="AppIcons.DELETE" />
        </UTooltip>
      </div>
    </template>
  </AdminTable>
</template>
