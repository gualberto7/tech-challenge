<script lang="ts" setup>
import api from "@/api";
import { onMounted, ref } from "vue";
const cats = ref([]);

onMounted(() => {
  api.get("/cats").then((response) => {
    console.log(response.data);
    cats.value = response.data;
  });
});
</script>

<template>
  <div>
    <h2>Cats</h2>
  </div>
</template>
