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
    <HeaderLogos small />

    <div class="flex gap-2">
      <UButton to="/" size="sm" :icon="AppIcons.HOME" color="dark">
        Home
      </UButton>

      <UButton
        v-if="!isDashboard"
        to="/admin"
        size="sm"
        :icon="AppIcons.SETTINGS"
        color="dark"
      >
        Dashboard
      </UButton>

      <UButton
        size="sm"
        :icon="AppIcons.LOCK_OPEN"
        color="dark"
        @click="logout"
      >
        Logout
      </UButton>
    </div>

    <slot />
  </UContainer>
</template>
