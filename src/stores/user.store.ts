import { create } from "zustand";

interface UserState {
  token: string | null;
  setToken: (token: string | null) => void;
  files: File[] | [];
  setFiles: (files: File[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: localStorage.getItem("token"),
  files: [],
  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
    set({ token });
  },
  setFiles: (files: File[]) => {
    set({ files: files });
  },
}));
