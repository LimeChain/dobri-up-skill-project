import React from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  // TO DO: Add mobile header / Hanburger menu etc.
  // TO DO: Think of some use case for search box in the center of the header or other feature
  // TO DO: Un/Auth state for the buttons and the logo redirect
  // TO DO: Add cool logo and name
  return (
    <header className="flex items-center gap-2 mb-6 px-4 py-1 bg-gray-100 shadow-md">
      <Link href="/home" className="flex items-center gap-2">
        <Image
          alt="logo"
          src="/logo.png"
          width={48}
          height={48}
          className="rounded-xl"
        />
        <p className="text-2xl tracking-widest">AppName</p>
      </Link>
      <div className="flex-1 text-center">CENTER SECTION</div>
      <div>BUTTONS / MENU</div>
    </header>
  );
};

export default Header;
