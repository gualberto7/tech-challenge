import { ref } from "vue";
import { defineStore } from "pinia";
import type { CatInterface } from "../interfaces/Cat";

export const useCatStore = defineStore("cats", () => {
  const cats = ref<CatInterface[]>([]);

  const setCats = (newCats: CatInterface[]) => {
    newCats.forEach((cat) => {
      cat.votes = Math.floor(Math.random() * 10);
      cats.value.push(cat);
    });
  };

  const findCat = (id: string) => {
    return cats.value.find((cat) => cat.id === id);
  };

  const addVote = (id: string) => {
    const cat = findCat(id);
    if (cat) {
      cat.votes++;
    }
  };

  const removeVote = (id: string) => {
    const cat = findCat(id);
    if (cat) {
      cat.votes--;
    }
  };

  return {
    cats,
    setCats,
    addVote,
    removeVote,
  };
});
