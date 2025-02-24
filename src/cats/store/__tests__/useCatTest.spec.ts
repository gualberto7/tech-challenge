import { mount } from "@vue/test-utils";
import { createTestingPinia } from "@pinia/testing";
// import any store you want to interact with in tests
import { useCatStore } from "../useCat";
import Cats from "@/cats/components/Cats.vue";
import { describe, expect, it, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import exp from "constants";

const baseCats = [
  {
    id: "12313",
    createdAt: "2021-09-01",
    mimetype: "image/jpeg",
    tags: ["cute"],
    votes: 2,
  },
  {
    id: "12314",
    createdAt: "2021-09-02",
    mimetype: "image/jpeg",
    tags: ["funny"],
    votes: 3,
  },
];

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("Use Cats Store", () => {
  it("Should set cats initial cats", async () => {
    const store = useCatStore();

    store.setCats(baseCats);

    expect(store.cats.length).toBe(2);
  });

  it("should find a cat by id", async () => {
    const store = useCatStore();

    store.setCats(baseCats);

    const cat = store.findCat("12313");

    expect(cat?.id).toBe("12313");
  });

  it("it should vote a cat", async () => {
    const store = useCatStore();

    store.setCats(baseCats);
    store.cats[0].votes = 2;

    expect(store.cats[0].votes).toBe(2);

    store.addVote("12313");

    expect(store.cats[0].votes).toBe(3);
  });
});
