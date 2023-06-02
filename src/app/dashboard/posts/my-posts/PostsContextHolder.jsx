"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import PostsBlock from "./PostsBlock";
import { BsSearch } from "react-icons/bs";
import fetchInstanceClientSide from "@/lib/fetchApi/fetchInstanceClientSide";

// Helper Function
function convertToSearchParams(query) {
  const searchParams = new URLSearchParams();

  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      const value = query[key];
      if (value !== null) {
        searchParams.append(key, value);
      }
    }
  }

  return searchParams.toString();
}

export default function PostContextHolder() {
  return <FunctionalComponent />;
}

const FunctionalComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [finalSearchInputValue, setFinalSearchInputValue] = useState("");

  function handleQueryChange() {
    setFinalSearchInputValue(inputValue);
  }

  return (
    <div className="w-full relative mx-auto p-10 border-2 space-y-5">
      <div className=" flex flex-col md:flex-row justify-between w-full inset-0 items-center">
        <div className="prose prose-headings:m-0">
          <h1>My own Posts</h1>
        </div>
        <div className="my-2 md:my-auto w-max border overflow-hidden rounded-md flex justify-center items-stretch">
          <input
            type="text"
            className="py-2 px-4 outline-none"
            placeholder="search post"
            value={inputValue}
            onChange={(e) => setInputValue(e.target?.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleQueryChange();
              }
            }}
          />
          <button
            type="button"
            className="bg-white py-2 px-4 flex items-center border-l group"
            onClick={handleQueryChange}
          >
            <BsSearch className="group-active:scale-95 transition" />
          </button>
        </div>
      </div>

      <PostsBlock searchQuery={finalSearchInputValue} />
    </div>
  );
};
