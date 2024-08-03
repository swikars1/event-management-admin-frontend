"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  loggedIn: boolean;
  setLoggedIn: (val: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      loggedIn: false,
      setLoggedIn: (by) => set(() => ({ loggedIn: by })),
    }),
    {
      name: "user-storage",
    }
  )
);
