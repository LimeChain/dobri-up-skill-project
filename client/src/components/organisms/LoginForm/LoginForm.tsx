"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login } from "@/lib/actions";

export default function LoginForm() {
  // TO DO: Add handlers / form action
  // TO DO: Loading state / suspense / form state
  // TO DO: Add error state
  // TO DO: Add Metamask login option

  const [state, formAction, pending] = useActionState(login, {
    message: "",
  });

  console.log("state", state);
  console.log("pending", pending);

  return (
    <div className="p-4 rounded-2xl max-w-lg mx-auto bg-gray-100 border-1 border-gray-200 shadow-md">
      <h2 className="text-3xl mx-3 mb-8 tracking-widest">LOGIN</h2>
      <form action={formAction} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col">
          <label htmlFor="email" className="ml-3 tracking-widest">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            className="py-1 px-3 rounded-2xl border-1 border-[#2d336b] bg-white"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="ml-3 tracking-widest">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            className="py-1 px-3 rounded-2xl border-1 border-[#2d336b] bg-white"
          />
        </div>
        <button className="hover:cursor-pointer hover:bg-indigo-50 border-1 rounded-2xl w-fit py-1 px-4 bg-white transition-all">
          Log In
        </button>
      </form>
      <div className="mt-4">
        <p className="text-xs text-right">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="hover:cursor-pointer hover:text-red-400 underline font-medium"
          >
            Register here!
          </Link>
        </p>
      </div>
    </div>
  );
}
