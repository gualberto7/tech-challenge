<script setup lang="ts">
import Cats from "./cats/components/Cats.vue";
</script>

<template>
  <div class="container mx-auto p-2 md:py-5 md:px-24">
    <header>
      <h1 class="text-lg font-bold">Choose and vote to your favorite CAT</h1>
    </header>

    <main>
      <Cats />
    </main>
  </div>
</template>
