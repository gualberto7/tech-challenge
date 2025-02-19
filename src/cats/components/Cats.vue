<script lang="ts" setup>
import api from "@/api";
import Cat from "./Cat.vue";
import { onMounted } from "vue";
import { useCatStore } from "../store/useCat";

const catStore = useCatStore();

onMounted(async () => {
  const { data } = await api.get("/cats");
  catStore.setCats(data);
});
</script>

<template>
  <div>
    <div class="grid grid-cols-5 gap-10">
      <Cat v-for="cat in catStore.cats" :key="cat.id" :cat="cat" />
    </div>
  </div>
</template>
