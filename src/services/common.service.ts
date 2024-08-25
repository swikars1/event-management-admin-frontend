import { API } from "@/lib/API";

const getAll = async (resource: string) => {
  const { data } = await API.get(`/${resource}`);

  return data;
};

const deletebyId = async ({
  resource,
  id,
}: {
  resource: string;
  id: string;
}) => {
  const { data } = await API.delete(`/${resource}/${id}`);

  return data;
};

export const commonService = {
  getAll,
  deletebyId,
};
