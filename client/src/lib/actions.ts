"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const register = async (_: unknown, registerFormData: FormData) => {
  console.log("registerFormData", registerFormData);
  const res = false;
  if (!res) {
    return { message: "Error!" };
  }
  (await cookies()).set({ name: "token", value: "jwt.token.from.backend" });
  redirect("/");
};

export const login = async (_: unknown, loginFormData: FormData) => {
  console.log("loginFormData", loginFormData);
  const res = false;
  if (!res) {
    return { message: "Error!" };
  }
  (await cookies()).set({ name: "token", value: "jwt.token.from.backend" });
  redirect("/");
};
