import { create } from "zustand";

interface UserState {
  token: string | null;
  setToken: (token: string | null) => void;
  files: File[] | [];
  setFiles: (files: File[]) => void;
  checkLeaderboardHome: boolean;
  checkLeaderboardPage: boolean;
  setClaimPoint: () => void;
  setCheckLeaderboard: (page: "home" | "leaderboard") => void;
}

export const useUserStore = create<UserState>((set) => ({
  token: localStorage.getItem("token"),
  files: [],
  checkLeaderboardHome: false,
  checkLeaderboardPage: false,
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
  setClaimPoint: () =>
    set({ checkLeaderboardHome: true, checkLeaderboardPage: true }),
  setCheckLeaderboard: (page) => {
    if (page == "home") {
      set({ checkLeaderboardHome: false });
    }

    if (page == "leaderboard") {
      set({ checkLeaderboardPage: false });
    }
  },
}));
