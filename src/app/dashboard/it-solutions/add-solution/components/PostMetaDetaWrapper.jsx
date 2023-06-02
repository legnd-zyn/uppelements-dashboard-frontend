"use client";
import React, { useState } from "react";
import CategoriesSelector from "./CategoriesSelector";
import ImageUploadPreview from "../../../components/ImageUploadPreview";
import { useCreateITSolution } from "../context";
import fetchInstaceClientSide from "@/lib/fetchApi/fetchInstanceClientSide";

export default React.memo(function ITSolutionMetaDetaWrapper() {
  const [isUploaded, setIsUploaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const contextValues = useCreateITSolution();
  const {
    title,
    setTitle,
    description,
    setDescription,
    setSelectedImage,
    resetAll,
  } = contextValues;

  async function handleSubmit(e) {
    e.preventDefault();

    const {
      title,
      description,
      category,
      subCategory,
      selectedImage,
      markdownToSubmit,
    } = contextValues;

    try {
      const reader = new FileReader();

      reader.onloadend = async function () {
        const imageData = reader.result.split(",")[1];

        const jsonData = {
          title: title,
          body: markdownToSubmit,
          image: {
            data: imageData,
            contentType: selectedImage.type,
          },
          category: category,
          description: description,
          subCategory: subCategory,
        };

        const res = await fetchInstaceClientSide("/it-solutions", {
          method: "POST",

          body: JSON.stringify(jsonData),
        });

        if (res.ok) {
          setIsUploaded(true);
          setTimeout(() => {
            setIsUploaded(false);
          }, 3000);
          resetAll();
        }

        if (!res.ok) {
          setIsError(true);
          setTimeout(() => {
            setIsError(false);
          }, 3000);
        }
      };

      reader.readAsDataURL(selectedImage);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="prose mb-10 prose-headings:text-gray-700">
        <h1>Add New Solution</h1>
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
          <ImageUploadPreview
            setSelectedImage={setSelectedImage}
            isUploaded={isUploaded}
          />
          ;
          <button
            type="submit"
            className="w-10/12 py-3 text-center border-2 mt-auto rounded-md bg-primary hover:bg-primary-focus text-white mx-auto transition active:scale-95"
          >
            Upload Post
          </button>
          {isUploaded && (
            <p className="w-10/12 mx-auto mt-2 p-2 text-sm rounded-md bg-green-600 text-white text-center">
              Successfully Uploaded
            </p>
          )}
          {isError && (
            <p className="w-10/12 mx-auto mt-2 p-2 text-sm rounded-md bg-red-600 text-white text-center">
              Something wen&apos;t wrong, retry!
            </p>
          )}
        </div>
      </div>
    </form>
  );
});
