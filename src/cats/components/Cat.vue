<script setup lang="ts">
import { computed, type PropType } from "vue";
import { type CatInterface } from "../interfaces/Cat";
import { useCatStore } from "../store/useCat";
import Button from "@/core/components/Button.vue";

const props = defineProps({
  cat: {
    type: Object as PropType<CatInterface>,
    required: true,
  },
});

const { addVote } = useCatStore();

const catImg = computed(() => {
  const baseUrl = "https://cataas.com/cat";
  if (props.cat.tags.length > 0) {
    return `${baseUrl}/${props.cat.id}`;
  }
  return baseUrl;
});
</script>

<template>
  <div class="shadow-lg p-4 rounded-lg">
    <div class="mb-3">
      <template v-if="cat.tags.length > 0">
        <span v-for="tag in cat.tags" :key="tag" class="text-sm text-gray-500">
          #{{ tag }}
        </span>
      </template>
      <template v-else>
        <span class="text-sm text-gray-500">No-Tags</span>
      </template>
    </div>
    <div class="w-full h-52">
      <img :src="catImg" alt="cat" class="w-full h-full object-cover" />
    </div>
    <div class="flex justify-between mt-3">
      <span class="text-gray-700">votes: {{ cat.votes }}</span>
      <div>
        <Button id="vote-button" size="xs" @click="addVote(cat.id)">
          Vote
        </Button>
      </div>
    </div>
  </div>
</template>
