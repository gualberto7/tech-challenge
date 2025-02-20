<script lang="ts" setup>
import api from "@/api";
import Cat from "./Cat.vue";
import { onMounted, ref } from "vue";
import { useCatStore } from "../store/useCat";

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
  const { data } = await api.get(`/cats?skip=${catStore.cats.length}&limit=10`);
  catStore.setCats(data);
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
      <button
        @click="getCats"
        class="bg-blue-500 text-white py-2 px-4 rounded shadow"
      >
        Load more
      </button>
    </div>
  </div>
</template>
