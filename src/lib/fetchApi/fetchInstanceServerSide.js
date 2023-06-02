import { cookies } from "next/headers";

export default async function fetchInstaceServerSide(url, options = {}) {
  try {
    const nextCookies = cookies();
    const token = nextCookies.get("token");

    const defaultOptions = {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization:
          token?.value !== "undefined" ? `Bearer ${token?.value}` : {},
        cache: "no-store",
      },
    };

    // Merge default options with user-provided options
    const mergedOptions = { ...defaultOptions, ...options };

    return fetch(
      `http://localhost:${process.env.API_PORT}/api${url}`,
      mergedOptions
    );
  } catch (error) {
    console.log(error);
    throw new Error("error in server instance");
  }
}
