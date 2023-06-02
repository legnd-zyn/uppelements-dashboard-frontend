"use client";
import React from "react";
import CategoriesSelector from "./CategoriesSelector";
import ImageUploadPreview from "../../../components/ImageUploadPreview";
import { useCreatePost } from "../context";

export default React.memo(function PostMetaDetaWrapper() {
  const contextValues = useCreatePost();
  const { title, setTitle, description, setDescription, setSelectedImage } =
    contextValues;

  function handleSubmit(e) {
    e.preventDefault();

    const {
      title,
      description,
      category,
      subCategory,
      selectedImage,
      markdownToSubmit,
    } = contextValues;

    const finalObj = {
      title,
      description,
      category,
      subCategory,
      selectedImage,
      markdownToSubmit,
    };
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="prose mb-10 prose-headings:text-gray-700">
        <h1>Create New Post</h1>
      </div>
      <div className="text-gray-500 grid grid-cols-2 gap-5">
        <div>
          <div className="flex flex-col text-xs space-y-2">
            <label className="text-lg font-medium" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title || ""}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white p-3 border border-gray-300 text-xs outline-none rounded-md overflow-hidden"
              placeholder="Enter Title Here"
              required
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <label className="text-lg font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              type="text"
              id="description"
              placeholder="Enter Description Here"
              value={description || ""}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="bg-white p-3 border w-full border-gray-300 text-xs outline-none focus:border-primary rounded-md overflow-hidden"
            />
          </div>
          <CategoriesSelector />
        </div>
        <div className="flex justify-between flex-col">
          <ImageUploadPreview setSelectedImage={setSelectedImage} />;
          <button
            type="submit"
            className="w-10/12 py-3 text-center border-2 mt-auto rounded-md hover:bg-primary hover:text-white mx-auto transition active:scale-95"
          >
            Upload Post
          </button>
        </div>
      </div>
    </form>
  );
});
