<template>
  <UApp>
    <UContainer class="h-svh flex flex-col justify-center items-center gap-4">
      <div class="flex flex-col items-center">
        <NuxtImg src="/img/d20.webp" sizes="md:400px" preload />
        <NuxtImg src="/img/wh.webp" sizes="md:400px" preload />
      </div>

      <slot />
    </UContainer>
  </UApp>
</template>
