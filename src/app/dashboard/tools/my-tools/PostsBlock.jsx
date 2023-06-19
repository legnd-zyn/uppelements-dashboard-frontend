"use client";
import React, { Suspense, useEffect, useMemo, useState } from "react";
import PostCard from "../../components/PostCard";
import fetchMyPosts from "@/lib/fetchMyPosts";
import LoadMoreButton from "../../components/Atoms/LoadMoreButton";
import fetchInstanceClientSide from "@/lib/fetchApi/fetchInstanceClientSide";
import ToolCard from "./components/ToolCard";

export default function PostsBlock({ searchQuery }) {
  const [postsObj, setPostsObj] = useState(null);
  const [page, setPage] = useState(1);
  const [isNextPostsLoading, setIsNextPostsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = useMemo(
    () => async () => {
      setIsLoading(true);
      const res = await fetchInstanceClientSide(
        `/ai-tools/my-tools?query=${searchQuery || ""}&page=1`
      );

      const posts = await res.json();

      if (res.ok) {
        setPostsObj(posts);
      }
      setIsLoading(false);
    },
    [searchQuery]
  );

  useEffect(() => {
    fetchPosts();
  }, [searchQuery]);

  const fetchMorePostsWithPage = useMemo(
    () => async () => {
      const res = await fetchMyPosts({
        query: `page=${page}&query=${searchQuery}`,
      });

      setPostsObj((prev) =>
        prev
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

  if (isLoading) {
    return (
      <div className="w-full h-64 flex justify-center items-center mx-auto">
        <span className="loader" />
      </div>
    );
  }

  if (postsObj?.posts.length === 0) {
    return (
      <div className="prose w-full h-64 flex justify-center items-center flex-col mx-auto">
        <h1>Not Found</h1>
        <p>Please use another keyword or you might have reached the end</p>
      </div>
    );
  }

  return postsObj ? (
    <>
      <div className="sm:grid  md:grid-cols-2 lg:grid-cols-3 gap-5 text-left">
        {postsObj?.posts && postsObj.posts.length === 0 ? (
          <div className="w-full h-48 flex justify-center items-center">
            <span className="loader" />
          </div>
        ) : (
          postsObj?.posts.map((tool, ind) => <ToolCard {...tool} key={ind} />)
        )}
      </div>
      {postsObj?.hasNext && (
        <LoadMoreButton
          disabled={isNextPostsLoading}
          isLoading={isNextPostsLoading}
          onClick={() => setPage((prev) => prev + 1)}
        />
      )}
    </>
  ) : (
    <div className="w-full max-w-md h-52 mx-auto flex justify-center items-center ">
      <span className="loader"></span>
    </div>
  );
}
