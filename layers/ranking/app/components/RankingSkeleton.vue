<template>
  <div v-for="_ of Array.from({ length: 5 })" class="flex gap-2 my-2">
    <USkeleton class="size-7" />
    <USkeleton class="h-7 w-full" />
  </div>
</template>
