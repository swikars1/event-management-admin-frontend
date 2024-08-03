import { API } from "@/lib/API";

const getAll = async (resource: string) => {
  const { data } = await API.get(`/${resource}`);

  return data;
};

export const commonService = {
  getAll,
};
