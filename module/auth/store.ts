import { create } from "zustand";

export const useAuthStore = create<useAuthprop>((set, get) => ({
  user: null,
  setUser: (user: authProp) => set({ user }),
  logout: () => {
    
    set({ user: null })},
    
    
}));
