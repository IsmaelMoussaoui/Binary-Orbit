import { defineStore } from "pinia";
import { User } from "../models/user.model";

type UserState = {
  user: User | null;
};

export const useUserStore = defineStore("user", {
  state: (): UserState => ({
    user: null,
  }),
  actions: {
    async signUp(
      username: string,
      email: string,
      password: string
    ): Promise<void> {},
    async signIn(email: string, password: string): Promise<void> {},
  },
});
