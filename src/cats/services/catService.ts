import api from "@/api";

export const getCats = async (query: string) => {
  const { data } = await api.get(`cats?${query}`);
  return data;
};
