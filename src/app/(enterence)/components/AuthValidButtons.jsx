"use client";
import { useRole } from "@/app/Context/ContextProvider";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function AuthValidButtons({ role: serverRole }) {
  const { role: clientRole } = useRole();
  const [role, setRole] = useState(serverRole);

  useEffect(() => {
    if (clientRole) {
      setRole(clientRole);
    }
  }, [clientRole]);

  return role && role === "guest" ? (
    <Link href={`/auth/login`}>
      <button className="w-max border-2 rounded-md px-4 py-2 text-white bg-primary text-sm border-primary-focus font-medium transition-all active:scale-90">
        Please login to continue to DashBoard
      </button>
    </Link>
  ) : (
    <Link href={`/dashboard`}>
      <button className="w-max border-2 rounded-md px-4 py-2 text-white bg-primary text-sm border-primary-focus font-medium transition-all active:scale-90">
        Let&apos;s Begin to DashBoard!
      </button>
    </Link>
  );
}

export default AuthValidButtons;
