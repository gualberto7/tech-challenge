<script setup lang="ts">
import { computed, type PropType } from "vue";
import { type CatInterface } from "../interfaces/Cat";

const props = defineProps({
  cat: {
    type: Object as PropType<CatInterface>,
    required: true,
  },
});

const catImg = computed(() => {
  const baseUrl = "https://cataas.com/cat";
  if (props.cat.tags.length > 0) {
    return `${baseUrl}/${props.cat.tags[0]}`;
  }
  return baseUrl;
});
</script>

<template>
  <div class="shadow-lg p-4 rounded-lg">
    <h2>{{ cat.id }}</h2>
    <div class="flex gap-2">
      <span v-for="tag in cat.tags" :key="tag">{{ tag }}</span>
    </div>
    <div class="w-full h-64">
      <img :src="catImg" alt="cat" class="w-full h-full object-cover" />
    </div>
  </div>
</template>
