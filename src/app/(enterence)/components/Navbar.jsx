import React from "react";
import Logo from "../images/uppelementslogo.png";
import Image from "next/image";
import fetchRole from "@/lib/fetchRole";
import Link from "next/link";
import IsAuthentecatedForNavbarButtons from "./IsAuthentecatedForNavbarButtons";

async function Navbar({ className }) {
  const role = await fetchRole();
  if (!role) {
    throw new Error("Something went wrong!");
  }

  return (
    <nav className={`container mx-auto py-2 px-4 md:px-14 ${className}`}>
      <div className="flex justify-between items-center">
        <Link href={"/"}>
          <div className="max-w-[200px] relative">
            <Image src={Logo} />
          </div>
        </Link>

        <IsAuthentecatedForNavbarButtons role={role} />
      </div>
    </nav>
  );
}

export default Navbar;
