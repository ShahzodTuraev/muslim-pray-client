import { create } from "zustand";
import { RegisterStore } from "../types/registerType";

export const useRegisterStore = create<RegisterStore>((set) => ({
  data: { user_name: null, user_email: null, user_password: null },
  setData: (value) => set({ data: value }),
}));
