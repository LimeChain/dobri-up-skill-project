"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import { clientLogout } from "@/lib/clientActions";
import { LuMenu } from "react-icons/lu";
import { MenuItems } from "@/components/molecules/MenuItems/MenuItems";

const Header = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMobileMenuState = () => {
    setMenuOpen(!menuOpen);
  };
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
            <span className="text-xs md:text-sm lg:text-md font-medium text-gray-700">
              Hi, {displayName}
            </span>
            <div className="border-r-1 h-6"></div>
            <button
              onClick={handleLogout}
              className="md:px-2 text-xs md:text-sm lg:text-md hover:text-red-400 transition"
            >
              Logout
            </button>
          </>
        ) : null}
      </div>
      <div className="block md:hidden h-8 pl-5 relative">
        <LuMenu
          className="w-full h-full cursor-pointer hover:text-red-400 transition"
          onClick={handleMobileMenuState}
        />
        <div className="absolute right-[-15px] top-11 w-[250px]">
          {menuOpen ? <MenuItems /> : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
