import { API } from "@/lib/API";

// login api call using api instance

const adminLogin = async (payload: { email: string; password: String }) => {
  const { data } = await API.post("/users/admin-login", payload);

  return data;
};

const userService = { adminLogin };

export { userService };
