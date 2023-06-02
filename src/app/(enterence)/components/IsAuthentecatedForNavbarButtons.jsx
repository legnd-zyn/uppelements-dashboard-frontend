"use client";
import React, { useEffect, useState } from "react";
import LogOutBtn from "./LogOutBtn";
import Link from "next/link";
import { useRole } from "@/app/Context/ContextProvider";

function IsAuthentecatedForNavbarButtons({ role: serverRole }) {
  const { role: clientRole } = useRole();
  const [role, setRole] = useState(serverRole);

  useEffect(() => {
    if (clientRole) {
      setRole(clientRole);
    }
  }, [clientRole]);

  return role && role === "guest" ? (
    <Link href={"/auth/login"}>
      <button className="border-2 rounded-md px-4 py-2 text-gray-500 text-sm border-gray-500 font-medium transition-all active:scale-90">
        Signin
      </button>
    </Link>
  ) : (
    <LogOutBtn />
  );
}

export default IsAuthentecatedForNavbarButtons;
