<script lang="ts" setup>
import api from "@/api";
import Cat from "./Cat.vue";
import { onMounted, ref } from "vue";
import { useCatStore } from "../store/useCat";
import Button from "@/core/components/Button.vue";
import * as CatService from "../services/catService";

const filters = [
  { label: "all", value: "recent" },
  { label: "voted", value: "voted" },
];

const catStore = useCatStore();
const selectedFilter = ref("recent");

onMounted(() => {
  getCats();
});

const getCats = async () => {
  const cats = await CatService.getCats(
    `skip=${catStore.cats.length}&limit=10`
  );
  catStore.setCats(cats);
};

const handleFilter = () => {
  console.log(selectedFilter.value);
  catStore.sortCats(selectedFilter.value);
};
</script>

<template>
  <div>
    <div class="flex gap-2 mt-5 items-center">
      <span class="tracking-widest">Sort By:</span>
      <select
        v-model="selectedFilter"
        @change="handleFilter"
        class="p-2 border border-gray-300 rounded-lg"
      >
        <option
          v-for="filter in filters"
          :key="filter.value"
          :value="filter.value"
        >
          {{ filter.label }}
        </option>
      </select>
    </div>
    <div class="grid grid-cols-5 gap-10">
      <Cat v-for="cat in catStore.cats" :key="cat.id" :cat="cat" />
    </div>
    <div class="flex justify-center mt-10">
      <Button @click="getCats"> Load more </Button>
    </div>
  </div>
</template>
