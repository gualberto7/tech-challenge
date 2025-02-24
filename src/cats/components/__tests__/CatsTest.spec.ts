import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  beforeAll,
  afterEach,
  afterAll,
  describe,
  it,
  beforeEach,
  expect,
} from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { setActivePinia, createPinia } from "pinia";

import Cats from "../Cats.vue";
import CatComponent from "../Cat.vue";

export const handlers = [
  http.get("https://cataas.com/api/cats", () => {
    return HttpResponse.json([
      {
        id: "12313",
        createdAt: "2021-09-01",
        mimetype: "image/jpeg",
        tags: ["cute"],
      },
      {
        id: "12314",
        createdAt: "2021-09-02",
        mimetype: "image/jpeg",
        tags: ["cute"],
      },
      {
        id: "12315",
        createdAt: "2021-09-03",
        mimetype: "image/jpeg",
        tags: ["cute"],
      },
    ]);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
beforeEach(() => {
  setActivePinia(createPinia());
});

describe("Cats component", () => {
  it("should render cats", async () => {
    const wrapper = mount(Cats);
    expect(wrapper.html()).toContain("Sort By:");

    await flushPromises();

    const catComponents = wrapper.findAllComponents(CatComponent);
    expect(catComponents).toHaveLength(3);
  });

  it("should load more cats when clicking in the load more button", async () => {
    const wrapper = mount(Cats);
    await flushPromises();
    expect(wrapper.findAllComponents(CatComponent)).toHaveLength(3);

    await wrapper.find("#load-more").trigger("click");
    await flushPromises();

    expect(wrapper.findAllComponents(CatComponent)).toHaveLength(6);
  });
});
