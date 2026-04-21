<script setup lang="ts">
useHead({
  title: 'Login',
});

const { fetch: refreshSession } = useUserSession();

const password = ref('');
const uInput = useTemplateRef('uInput');

const toast = useToast();

async function submit() {
  const res = await fetchApi('/api/admin/login', {
    method: 'POST',
    body: { password: password.value },
  });

  if (res.success) {
    toast.add({ title: 'Sessione admin aperta', color: 'success' });

    await refreshSession();
    await navigateTo('/admin');
    return;
  }

  delay(10).then(() => uInput.value?.inputRef?.focus());
}
</script>

<template>
  <UCard>
    <div class="space-y-4">
      <div>
        <p class="text-xl">Admin login</p>
        <p class="text-sm text-muted">
          Inserisci la password di admin per entrare nella gestione del sito
        </p>
      </div>

      <UForm class="flex gap-2" @submit.prevent="submit">
        <UInput
          ref="uInput"
          type="password"
          v-model="password"
          placeholder="Password"
          class="grow"
          autofocus
        />
        <UButton type="submit">Entra</UButton>
      </UForm>
    </div>
  </UCard>
</template>
