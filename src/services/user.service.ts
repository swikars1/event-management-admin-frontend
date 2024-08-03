import { API } from "@/lib/API";

// login api call using api instance

const login = async (payload: { email: string; password: String }) => {
  const { data } = await API.post("/users/login", payload);

  return data;
};

const userService = { login };

export { userService };
