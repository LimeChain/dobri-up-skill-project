"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/lib/actions";
import { useAuthStore } from "@/lib/store";

export default function LoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [state, formAction, pending] = useActionState(login, {
    message: "",
  });

  useEffect(() => {
    if (state?.user) {
      setAuth(state.user);
      router.push("/");
    }
  }, [state, setAuth, router]);

  const { errors } = state || {};
  const fieldErrors: Record<string, string[]> = errors?.fieldErrors || {};

  const inputFields = [
    {
      id: "login-email",
      label: "Email",
      name: "email",
      type: "email",
      error: fieldErrors.email,
    },
    {
      id: "login-password",
      label: "Password",
      name: "password",
      type: "password",
      error: fieldErrors.password,
    },
  ];

  return (
    <div className="p-4 rounded-2xl max-w-lg mx-auto bg-gray-100 border-1 border-gray-200 shadow-md">
      <h2 className="text-3xl mx-3 mb-8 tracking-widest">LOGIN</h2>

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

      <form action={formAction} className="flex flex-col gap-4 w-full">
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
          {pending ? "Logging in..." : "Log In"}
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
