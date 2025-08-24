"use client";

import { useActionState } from "react";
import Link from "next/link";
import { register } from "@/lib/actions";

export default function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, {
    message: "",
  });

  const { errors } = state || {};
  const fieldErrors: Record<string, string[]> = errors?.fieldErrors || {};

  const inputFields = [
    {
      id: "register-first-name",
      label: "First name",
      name: "firstName",
      type: "text",
      error: fieldErrors.firstName,
    },
    {
      id: "register-last-name",
      label: "Last name",
      name: "lastName",
      type: "text",
      error: fieldErrors.lastName,
    },
    {
      id: "register-email",
      label: "Email",
      name: "email",
      type: "email",
      error: fieldErrors.email,
    },
    {
      id: "register-password",
      label: "Password",
      name: "password",
      type: "password",
      error: fieldErrors.password,
    },
    {
      id: "register-repeat-password",
      label: "Repeat password",
      name: "repeatPassword",
      type: "password",
      error: fieldErrors.repeatPassword,
    },
  ];

  return (
    <div className="p-4 rounded-2xl max-w-lg mx-auto bg-gray-100 border-1 border-gray-200 shadow-md">
      <h2 className="text-3xl mx-3 mb-8 tracking-widest">REGISTER</h2>

      {state?.message && (
        <div
          className={`mb-4 p-3 rounded-lg text-sm border ${
            state.message.includes("Successful")
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-red-100 text-red-700 border-red-300"
          }`}
        >
          {state.message}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-5 w-full">
        {inputFields.map(({ id, label, name, type, error }) => (
          <div key={id} className="flex flex-col relative">
            <label htmlFor={id} className="ml-3 tracking-widest">
              {label}
            </label>
            <input
              id={id}
              name={name}
              type={type}
              className="py-1 px-3 rounded-2xl border-1 border-[#2d336b] bg-white"
              style={{ borderColor: error ? "red" : "" }}
            />
            {error && (
              <p className="text-red-500 text-xs mt-1 absolute top-13.5 left-3">
                {error.join(" | ")}
              </p>
            )}
          </div>
        ))}
        <button
          disabled={pending}
          className="hover:cursor-pointer hover:bg-indigo-50 border-1 rounded-2xl w-fit py-1 px-4 bg-white transition-all"
        >
          {pending ? "Registering..." : "Register!"}
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
