"use client";
import Cookies from "js-cookie";

export default async function fetchInstaceClientSide(url, options = {}) {
  const token = Cookies.get("token");
  const defaultOptions = {
    method: "GET",

    headers: {
      "Content-Type": "application/json",
      Authorization: token !== "undefined" ? `Bearer ${token}` : {},
      cache: "no-store",
    },
  };

  // Merge default options with user-provided options
  const mergedOptions = { ...defaultOptions, ...options };

  return fetch(`${process.env.NEXT_PUBLIC_HOST}/api${url}`, mergedOptions);
}
