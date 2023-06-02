"use client";
import { useRole } from "@/app/Context/ContextProvider";
import { deleteTokenCookie } from "@/utils/deleteTokenCookie";
import React from "react";

const LogOutBtn = () => {
  const { fetchRole } = useRole();
  const handleLogout = () => {
    deleteTokenCookie();
    fetchRole();
  };
  return (
    <button
      className="border-2 rounded-md px-4 py-2 text-gray-500 text-sm border-gray-500 font-medium transition-all active:scale-90"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogOutBtn;
