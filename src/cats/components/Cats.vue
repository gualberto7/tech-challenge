<script lang="ts" setup>
import api from "@/api";
import { onMounted, ref } from "vue";
import type { CatInterface } from "../interfaces/Cat";
import Cat from "./Cat.vue";

const cats = ref<CatInterface[]>([]);

onMounted(() => {
  api.get("/cats").then((response) => {
    console.log(response.data);
    cats.value = response.data;
  });
});
</script>

<template>
  <div>
    <div class="grid grid-cols-5 gap-10">
      <Cat v-for="cat in cats" :key="cat.id" :cat="cat" />
    </div>
  </div>
</template>
