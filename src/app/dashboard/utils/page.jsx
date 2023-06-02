import Link from "next/link";
import React from "react";
import { MdArticle, MdQuestionAnswer } from "react-icons/md";
import { TbTopologyStar3 } from "react-icons/tb";

export default function page() {
  return (
    <div
      className="lg:mt-36 h-max 
    text-center md:max-w-[80%] m-4 md:p-10 md:mx-auto bg-base-200 p-4 rounded-md"
    >
      <div className="prose text-left max-w-none">
        <h1 className="text-gray-700 text-center uppercase">Utilities</h1>
      </div>
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-10 mt-8">
        <Link href={`/dashboard/utils/articles`}>
          <div className="w-full flex flex-col justify-center items-center bg-primary-focus p-4 py-10 text-slate-100 rounded-md hover:scale-105 transition">
            <span className="p-4 bg-primary rounded-full">
              <MdArticle size={"1.5rem"} color="#fff" className="fill-white" />
            </span>
            <h2 className="mt-2 text-sm">utils</h2>
            <h2 className="text-lg font-bold">Articles</h2>
          </div>
        </Link>

        <Link href={`/dashboard/utils/it-solutions`}>
          <div className="w-full flex flex-col justify-center items-center bg-primary-focus p-4 py-10 text-slate-100 rounded-md hover:scale-105 transition">
            <span className="p-4 bg-primary rounded-full">
              <TbTopologyStar3
                size={"1.5rem"}
                color="#fff"
                className="fill-white"
              />
            </span>
            <h2 className="mt-2 text-sm">utils</h2>
            <h2 className="text-lg font-bold">IT-Solutions</h2>
          </div>
        </Link>
        <Link href={`/dashboard/utils/interview-qa`}>
          <div className="w-full flex flex-col justify-center items-center bg-primary-focus p-4 py-10 text-slate-100 rounded-md hover:scale-105 transition">
            <span className="p-4 bg-primary rounded-full">
              <MdQuestionAnswer
                size={"1.5rem"}
                color="#fff"
                className="fill-white"
              />
            </span>
            <h2 className="mt-2 text-sm">utils</h2>
            <h2 className="text-lg font-bold">Interview Q&amp;A</h2>
          </div>
        </Link>
      </div>
    </div>
  );
}
