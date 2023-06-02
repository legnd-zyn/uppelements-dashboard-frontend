import Image from "next/image";
import Link from "next/link";
import React from "react";
import otpSendedIllustration from "../images/otpSended.png";

const LinkSended = ({ message, type }) => {
  return (
    <div className="grid md:grid-cols-2 m-auto gap-10 max-w-6xl mt-10">
      <div className="prose flex flex-col justify-center">
        <h1>{type}</h1>
        <p>{message}</p>
        <Link
          href={"/"}
          className="no-underline outline-none border-primary border-2 bg-transparent hover:bg-primary hover:border-primary-focus text-primary-focus hover:text-white w-max px-4 py-2 rounded-md transition active:scale-90 text-sm"
        >
          Go Back
        </Link>
      </div>
      <div className="relative max-w-md mx-auto">
        <Image src={otpSendedIllustration} />
      </div>
    </div>
  );
};

export default LinkSended;
