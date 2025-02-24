<script lang="ts" setup>
import Cat from "./Cat.vue";
import { onMounted, ref } from "vue";
import { useCatStore } from "../store/useCat";
import Button from "@/core/components/Button.vue";
import * as CatService from "../services/catService";

const filters = [
  { label: "all", value: "recent" },
  { label: "most favorites", value: "voted" },
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

const getTrendiestCats = async () => {
  const cats = await CatService.getCats(
    `skip=${catStore.cats.length}&limit=10&tags=supercat,supermodel`
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
    <div class="flex justify-between items-center">
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
      <Button @click="getTrendiestCats" disabled> Trendiest Cats </Button>
    </div>
    <div
      class="grid gril-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10"
    >
      <Cat v-for="cat in catStore.cats" :key="cat.id" :cat="cat" />
    </div>
    <div class="flex justify-center mt-10">
      <Button id="load-more" @click="getCats"> Load more </Button>
    </div>
  </div>
</template>
