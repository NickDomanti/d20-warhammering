<script setup lang="ts">
import type { TableColumn, TableRow } from '@nuxt/ui';

useHead({ title: 'Gestione battaglie' });

const { data, pending, refresh } = useFetchApi('/api/admin/battles');

const columns: TableColumn<Battle>[] = [
  {
    accessorKey: 'date',
    cell: ({ row }) => formatDate(row.original.date),
    meta: { class: { th: 'w-30' } },
  },
  {
    id: 'players',
    header: 'Giocatori',
    meta: { class: { th: 'w-100' } },
  },
  {
    id: 'points',
    header: 'Punti',
    meta: { class: { th: 'w-30' } },
  },
  {
    id: 'factions',
    header: 'Fazioni',
  },
  {
    id: 'actions',
    header: 'Azioni',
    meta: { class: { th: 'w-30 text-center' } },
  },
];

function getWinner({ original: battle }: TableRow<Battle>) {
  if (battle.player1Points > battle.player2Points) return 1;
  if (battle.player1Points < battle.player2Points) return 2;
  return 0;
}

const deletingId = ref<number>();

const toast = useToast();

async function deleteBattle(id: number, close: () => void) {
  deletingId.value = id;

  const { success } = await fetchApi(`/api/admin/battles/${id}`, {
    method: 'DELETE',
  });

  deletingId.value = undefined;

  if (!success) return;

  toast.add({ title: 'Battaglia eliminata' });

  refresh();
  close();
}
</script>

<template>
  <AdminTable :data :columns :pending :ui="{ td: 'space-x-2' }">
    <template #date-header="{ column }">
      <UButton
        color="neutral"
        variant="ghost"
        :icon="getSortIcon(column.getIsSorted())"
        @click="handleTableColumnSorting(column)"
      >
        Data
      </UButton>
    </template>

    <template #players-cell="{ row }">
      <UBadge
        :icon="
          {
            0: BattleOutcomeIcons.TIE,
            1: BattleOutcomeIcons.WIN,
            2: BattleOutcomeIcons.LOSS,
          }[getWinner(row)]
        "
      >
        {{ row.original.player1 }}
      </UBadge>

      <UBadge
        color="secondary"
        :icon="
          {
            0: BattleOutcomeIcons.TIE,
            1: BattleOutcomeIcons.LOSS,
            2: BattleOutcomeIcons.WIN,
          }[getWinner(row)]
        "
      >
        {{ row.original.player2 }}
      </UBadge>
    </template>

    <template #points-cell="{ row }">
      <UBadge>{{ row.original.player1Points }}</UBadge>
      <UBadge color="secondary">{{ row.original.player2Points }}</UBadge>
    </template>

    <template #factions-cell="{ row }">
      <UBadge>{{ row.original.player1Faction }}</UBadge>
      <UBadge color="secondary">{{ row.original.player2Faction }}</UBadge>
    </template>

    <template #actions-cell="{ row }">
      <div class="flex justify-center gap-2">
        <UTooltip text="Modifica">
          <UButton color="dark" icon="material-symbols:edit" />
        </UTooltip>

        <ConfirmModal
          description="Confermi di voler eliminare questa battaglia dai record?"
          confirm-text="Elimina"
          confirm-color="secondary"
          :confirm-pending="deletingId === row.original.id"
          @confirm="(close) => deleteBattle(row.original.id, close)"
        >
          <UTooltip text="Elimina">
            <UButton color="dark" icon="material-symbols:delete" />
          </UTooltip>
        </ConfirmModal>
      </div>
    </template>
  </AdminTable>
</template>
