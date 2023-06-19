"use client";
import PostCard from "@/app/dashboard/components/PostCard";
import fetchInstanceClientSide from "@/lib/fetchApi/fetchInstanceClientSide";
import React, { useEffect, useMemo, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { GrClose } from "react-icons/gr";
import fetchMyPosts from "@/lib/fetchMyPosts";
import LoadMoreButton from "@/app/dashboard/components/Atoms/LoadMoreButton";

export function PopUpComponent({ handlePopup, moderator }) {
  const [postsObj, setPostsObj] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [inputValue, setInputValue] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isNextPostsLoading, setIsNextPostsLoading] = useState(false);

  const fetchPosts = useMemo(
    () => async () => {
      const res = await fetchInstanceClientSide(
        `/posts/my-posts?query=${searchQuery || ""}&authorId=${moderator._id}`
      );

      const posts = await res.json();

      if (res.ok) {
        setPostsObj(posts);
      }
      setIsLoading(false);
    },
    [searchQuery, moderator._id]
  );

  useEffect(() => {
    setIsLoading(true);
    fetchPosts();
  }, [fetchPosts]);

  function handleSearchSubmit() {
    setSearchQuery(inputValue);
  }

  const fetchMorePostsWithPage = useMemo(
    () => async () => {
      const res = await fetchMyPosts({
        query: `page=${page}&query=${searchQuery || ""}&authorId=${
          moderator._id
        }`,
      });

      console.log(res);

      setPostsObj((prev) =>
        !!prev
          ? {
              ...prev,
              posts: [...prev.posts, ...res.posts],
              hasNext: res.hasNext,
            }
          : res
      );
      setIsNextPostsLoading(false);
    },
    [page]
  );

  useEffect(() => {
    if (page !== 1) {
      setIsNextPostsLoading(true);
      fetchMorePostsWithPage();
    }
  }, [page]);

  return (
    <div className="fixed w-full h-screen top-0 left-0 right-0 bottom-0 bg-gray-500/60 z-50 cursor-auto">
      <div className="w-full h-[90%] rounded-t-2xl bg-base-100 absolute bottom-0 flex flex-col justify-between ">
        <button
          type="button"
          className="absolute top-10 right-10 p-3 bg-base-200 rounded-full hover:bg-base-300 active:scale-95 shadow-sm hover:shadow-md z-50"
          onClick={(e) => {
            handlePopup();
          }}
        >
          <GrClose size={"1.2rem"} className="pointer-events-none" />
        </button>

        <div className="prose text-left w-full max-w-5xl mx-auto flex-col md:flex-row px-4 flex items-center justify-between mt-10">
          <h1>{moderator.username}</h1>
          <div className="my-2 md:my-auto w-max border overflow-hidden rounded-md flex justify-center items-stretch">
            <input
              type="text"
              className="py-2 px-4 outline-none"
              placeholder="search post"
              value={inputValue || ""}
              onChange={(e) => setInputValue(e.target?.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
            />
            <button
              type="button"
              className="bg-white py-2 px-4 flex items-center border-l group"
              onClick={handleSearchSubmit}
            >
              <BsSearch className="group-active:scale-95 transition" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-full flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <div className="overflow-y-scroll h-max relative pb-10">
            <div className=" relative flex-1 my-5 flex flex-col justify-between">
              {postsObj?.posts && postsObj.posts.length === 0 ? (
                <div className="prose w-full h-48 flex flex-col mx-auto justify-center gap-2 items-center">
                  <h1>Not Found</h1>
                  <p className="font-bold">
                    Please try again with another keyword.
                  </p>
                </div>
              ) : (
                <>
                  <div className="sm:grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto py-10 h-full  p-10">
                    {postsObj?.posts.map((post, ind) => (
                      <PostCard {...post} key={ind} />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="mt-5">
              {postsObj?.hasNext && (
                <LoadMoreButton
                  isLoading={isNextPostsLoading}
                  disabled={isNextPostsLoading}
                  onClick={() => setPage((prev) => prev + 1)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
