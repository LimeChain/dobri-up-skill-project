"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/lib/actions";

export default function RegisterForm() {
  // TO DO: Add handlers / form action
  // TO DO: Loading state / suspense / form state
  // TO DO: Add error state
  // TO DO: Add Metamask login option

  const [state, formAction, pending] = useActionState(register, {
    message: "",
  });

  return (
    <div className="p-4 rounded-2xl max-w-lg mx-auto bg-gray-100 shadow-md">
      <h2 className="text-3xl mx-3 mb-8 tracking-widest">REGISTER</h2>
      <form action={formAction} className="flex flex-col gap-4 w-full">
        <div className="flex flex-col">
          <label htmlFor="email" className="ml-3 tracking-widest">
            Email
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            className="py-1 px-3 rounded-2xl border-1 border-[#2d336b] bg-white"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="username" className="ml-3 tracking-widest">
            Username
          </label>
          <input
            id="register-username"
            name="username"
            type="text"
            className="py-1 px-3 rounded-2xl border-1 border-[#2d336b] bg-white"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password" className="ml-3 tracking-widest">
            Password
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            className="py-1 px-3 rounded-2xl border-1 border-[#2d336b] bg-white"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="repeat-password" className="ml-3 tracking-widest">
            Repeat password
          </label>
          <input
            id="register-repeat-password"
            name="repeat-password"
            type="password"
            className="py-1 px-3 rounded-2xl border-1 border-[#2d336b] bg-white"
          />
        </div>
        <button
          disabled={pending}
          className="hover:cursor-pointer hover:bg-indigo-50 border-1 rounded-2xl w-fit py-1 px-4 bg-white transition-all"
        >
          Register!
        </button>
      </form>
      <div className="mt-4">
        <p className="text-xs text-right">
          Already have an account?{" "}
          <Link
            href="/login"
            className="hover:cursor-pointer hover:text-red-400 underline font-medium"
          >
            Log In here!
          </Link>
        </p>
      </div>
    </div>
  );
}
