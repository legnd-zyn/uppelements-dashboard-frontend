import React from "react";
import Tick from "./tick.png";
import Image from "next/image";
import fetchInstaceServerSide from "@/lib/fetchApi/fetchInstanceServerSide";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export default async function page({ searchParams }) {
  const res = await fetchInstaceServerSide(
    `/auth/signup/verify?token=${searchParams?.token}`
  );

  if (!res.ok) {
    return (
      <div className="max-w-md relative mx-auto bg-base-200 flex justify-center flex-col items-center p-10 rounded-md">
        <Link href={"/auth/login"}>
          <div className="absolute top-10 left-10 p-2 rounded-full bg-base-100 text-primary-focus">
            <MdArrowBack color="currentColor" size={"1.2rem"} />
          </div>
        </Link>
        <div className="relative w-4/5 mx-auto flex justify-center">
          <Image src={Tick} />
        </div>
        <div className="prose text-gray-500 text-center">
          <h1>Verified</h1>
          <p>
            Your Uppelemen account has been successfully verified, Please wait
            patiently until the administrators grant you administrative
            privileges.
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="max-w-md mx-auto mt-10 flex items-center justify-center">
        <div className="prose prose-headings:m-0 prose-p:m-0 text-center bg-base-200 mx-auto p-10 rounded-md">
          <h1 className="text-red-600">ERROR</h1>
          <p>Your link might be expired or invalid</p>
          <p>Please request a resend</p>
          <Link href={"/"} className="no-underline mt-5">
            <span className="px-4 py-2 bg-primary text-sm rounded-md text-white">
              Go Home
            </span>
          </Link>
        </div>
      </div>
    );
  }
}
