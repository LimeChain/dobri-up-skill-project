"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const register = async (prevState: any, registerFormData: FormData) => {
  const res = false;
  if (!res) {
    return { message: "Error!" };
  }
  (await cookies()).set({ name: "token", value: "jwt.token.from.backend" });
  redirect("/");
};

export const login = async (prevState: any, loginFormData: FormData) => {
  const res = false;
  if (!res) {
    return { message: "Error!" };
  }
  (await cookies()).set({ name: "token", value: "jwt.token.from.backend" });
  redirect("/");
};
