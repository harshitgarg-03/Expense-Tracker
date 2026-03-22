import { create } from "zustand";

export const useAuthStore = create<useAuthprop>((set) => ({
  user: null,
  setUser: (user: authProp) => set({ user }),
  logout: () => set({ user: null }),
}));
