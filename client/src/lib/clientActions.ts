"use client";

import { logout } from "./actions";
import { useAuthStore } from "./store";

export const clientLogout = async () => {
  const logoutFromStore = useAuthStore.getState().logout;
  logoutFromStore();
  await logout();
};
