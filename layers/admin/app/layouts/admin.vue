<script setup lang="ts">
defineProps<{
  isDashboard?: boolean;
}>();

const { clear: clearSession } = useUserSession();

const toast = useToast();

async function logout() {
  await clearSession();
  toast.add({ title: 'Sessione admin chiusa' });
  navigateTo('/');
}
</script>

<template>
  <UContainer class="h-svh flex flex-col items-center gap-4 py-8">
    <NuxtLink to="/" class="flex flex-col items-center w-50">
      <NuxtImg src="/img/d20.webp" />
      <NuxtImg src="/img/wh.webp" />
    </NuxtLink>

    <div class="flex gap-2">
      <UButton to="/" size="sm" icon="material-symbols:home" color="dark">
        Home
      </UButton>

      <UButton
        v-if="!isDashboard"
        to="/admin"
        size="sm"
        icon="material-symbols:settings"
        color="dark"
      >
        Dashboard
      </UButton>

      <UButton
        size="sm"
        icon="material-symbols:lock-open-right"
        color="dark"
        @click="logout"
      >
        Logout
      </UButton>
    </div>

    <slot />
  </UContainer>
</template>
