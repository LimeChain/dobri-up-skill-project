"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { clientLogout } from "@/lib/clientActions";

const Header = () => {
  const { user, isAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    await clientLogout();
  };

  const displayName = user
    ? user.lastName
      ? `${user.firstName} ${user.lastName}`
      : user.firstName
    : "";

  return (
    <header className="flex items-center gap-2 px-4 py-1 fixed top-0 z-10 w-full max-w-[1920px] bg-gray-100 border-b-1 border-gray-200 shadow-md">
      <Link href="/" className="flex items-center gap-2">
        <Image
          alt="logo"
          src="/logo.png"
          width={68}
          height={68}
          className="rounded-xl object-cover max-h-[48px] w-auto h-auto"
        />
        <p className="text-2xl tracking-widest font-medium">Page</p>
      </Link>
      <div className="flex-1 text-center"></div>
      <div className="flex items-center gap-4">
        {isAuthenticated && user ? (
          <>
            <span className="text-sm font-medium text-gray-700">
              Hi, {displayName}
            </span>
            <div className="border-r-1 h-6"></div>
            <button
              onClick={handleLogout}
              className="px-3 py-1 text-sm hover:text-red-600 transition-colors"
            >
              Logout
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
