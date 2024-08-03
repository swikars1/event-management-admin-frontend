"use client";
import { useLocalStorage } from "./useLocalStorage";

export const useLoginState = () => {
  const [token] = useLocalStorage({ key: "token", initialValue: "" });
  return { isLoggedIn: !!token };
};
