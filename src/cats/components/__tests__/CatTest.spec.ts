import { describe, it, beforeEach, expect, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { mount } from "@vue/test-utils";

import CatComponent from "../Cat.vue";
import { useCatStore } from "@/cats/store/useCat";
import { mockedStore } from "@/core/store/useMockedStore";

beforeEach(() => {
  setActivePinia(createPinia());
});

describe("Cat component", () => {
  it("should render cat", async () => {
    const cat = {
      id: "12313",
      createdAt: "2021-09-01",
      mimetype: "image/jpeg",
      tags: ["cute"],
      votes: 2,
    };

    const wrapper = mount(CatComponent, {
      props: {
        cat,
      },
    });

    expect(wrapper.html()).toContain("cute");
    expect(wrapper.html()).toContain("https://cataas.com/cat/12313");
    expect(wrapper.html()).toContain("votes: 2");
  });

  it("should emit addVote action store", async () => {
    const cat = {
      id: "12313",
      createdAt: "2021-09-01",
      mimetype: "image/jpeg",
      tags: ["cute"],
      votes: 2,
    };

    const catStore = mockedStore(useCatStore);
    vi.spyOn(catStore, "addVote").mockImplementation((id) => {
      if (id === cat.id) {
        cat.votes += 1;
      }
    });
    const wrapper = mount(CatComponent, {
      props: {
        cat,
      },
      global: {
        provide: {
          catStore,
        },
      },
    });

    await wrapper.find("button").trigger("click");

    expect(catStore.addVote).toHaveBeenCalled();
  });
});
