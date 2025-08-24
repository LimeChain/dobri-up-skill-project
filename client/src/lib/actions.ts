"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { API_URL, AUTH_ENDPONIT } from "@/constants";

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    repeatPassword: z
      .string()
      .min(6, "Repeat password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const register = async (_: unknown, registerFormData: FormData) => {
  const formData = Object.fromEntries(registerFormData.entries());

  const validation = registerSchema.safeParse(formData);
  if (!validation.success) {
    return { message: "Validation Error!", errors: validation.error.flatten() };
  }

  try {
    const { repeatPassword, ...registerData } = validation.data;

    const response = await fetch(`${API_URL}${AUTH_ENDPONIT}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.message || "Registration failed" };
    }

    const userData = await response.json();

    (await cookies()).set({
      name: "token",
      value: userData.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  } catch (error) {
    return { message: "Registration failed. Please try again." };
  }

  redirect("/");
};

export const login = async (_: unknown, loginFormData: FormData) => {
  const formData = Object.fromEntries(loginFormData.entries());

  const validation = loginSchema.safeParse(formData);
  if (!validation.success) {
    return { message: "Validation Error!", errors: validation.error.flatten() };
  }

  try {
    const response = await fetch(`${API_URL}${AUTH_ENDPONIT}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(validation.data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { message: errorData.message || "Login failed" };
    }

    const userData = await response.json();

    (await cookies()).set({
      name: "token",
      value: userData.access_token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
  } catch (error) {
    return { message: "Login failed. Please try again." };
  }

  redirect("/");
};

export const logout = async () => {
  (await cookies()).delete("token");
  redirect("/login");
};
