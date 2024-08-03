import { API } from "@/lib/API";

// login api call using api instance

const getAll = async (payload: {}) => {
  const { data } = await API.get("/caterings", payload);

  return data;
};

const cateringService = {
  getAll,
};
