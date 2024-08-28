import { API } from "@/lib/API";

const getAll = async (resource: string) => {
  const { data } = await API.get(`/${resource}`);

  return data;
};

const getOne = async (resource: string, id: string) => {
  const { data } = await API.get(`/${resource}/${id}`);

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

const create = async ({
  resource,
  payload,
}: {
  resource: string;
  payload: any;
}) => {
  const { data } = await API.post(`/${resource}`, payload);

  return data;
};

export const commonService = {
  getAll,
  getOne,
  create,
  deletebyId,
};
