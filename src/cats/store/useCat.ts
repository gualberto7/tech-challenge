import { ref } from "vue";
import { defineStore } from "pinia";
import type { CatInterface } from "../interfaces/Cat";

export const useCatStore = defineStore("cats", () => {
  const cats = ref<CatInterface[]>([]);
  const filter = ref<string>("all");

  const setCats = (newCats: CatInterface[]) => {
    newCats.forEach((cat) => {
      cat.votes = Math.floor(Math.random() * 10);
      cats.value.push(cat);
    });
  };

  const findCat = (id: string) => {
    return cats.value.find((cat) => cat.id === id);
  };

  const sortCats = (sort: string) => {
    switch (sort) {
      case "voted":
        return cats.value.sort((a, b) => b.votes - a.votes);
      case "recent":
        return cats.value.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      default:
        return cats.value;
    }
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
    filter,
    setCats,
    addVote,
    removeVote,
    sortCats,
    findCat,
  };
});
