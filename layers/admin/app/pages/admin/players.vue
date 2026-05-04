<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';

useHead({ title: 'Gestione giocatori' });

const { data, pending: loading, refresh } = useFetchApi('/api/players');

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

const deletingName = ref<string>();

const toast = useToast();

async function deletePlayer(name: string, close: () => void) {
  deletingName.value = name;

  const { success } = await fetchApi(
    `/api/admin/players/${encodeURIComponent(name)}`,
    { method: 'DELETE' },
  );

  deletingName.value = undefined;

  if (!success) return;

  toast.add({ title: 'Giocatore eliminato' });

  refresh();
  close();
}
</script>

<template>
  <AdminTable :data :columns :loading>
    <template #actions-cell="{ row }">
      <div class="flex justify-center gap-2">
        <UTooltip text="Modifica">
          <UButton color="dark" icon="material-symbols:edit" />
        </UTooltip>

        <ConfirmModal
          :description="`Confermi di voler eliminare ${row.original.name}? Verranno cancellate anche tutte le sue partite.`"
          confirm-text="Elimina"
          confirm-color="secondary"
          :confirm-pending="deletingName === row.original.name"
          @confirm="(close) => deletePlayer(row.original.name, close)"
        >
          <UTooltip text="Elimina">
            <UButton color="dark" icon="material-symbols:delete" />
          </UTooltip>
        </ConfirmModal>
      </div>
    </template>
  </AdminTable>
</template>
