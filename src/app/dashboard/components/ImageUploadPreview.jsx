"use client";
import React, { useEffect, useState, useRef } from "react";

export default React.memo(function ImageUploadPreview({
  setSelectedImage,
  isUploaded,
}) {
  const [previewImage, setPreviewImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    } else {
      setPreviewImage(null);
      setSelectedImage(null);
    }
  };

  const handleRemoveImage = () => {
    setPreviewImage(null);
    setSelectedImage(null);
    fileInputRef.current.value = ""; // Reset the value of the input element
  };

  useEffect(() => {
    if (isUploaded) {
      handleRemoveImage();
    }
  }, [isUploaded]);

  return (
    <div className="relative text-center flex flex-col w-max min-w-40 mx-auto">
      <p>Image Upload</p>
      {previewImage && (
        <div>
          <img
            src={previewImage}
            alt="Preview"
            className="mt-4 mx-auto max-w-full aspect-video object-cover max-h-40 border-2 p-2"
          />
        </div>
      )}
      <div>
        <label
          htmlFor="imageInput"
          className="flex items-center justify-center h-10 w-full min-w-40 bg-gray-200 rounded-md cursor-pointer mt-2 px-20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 00-1 1v4H5a1 1 0 100 2h4v4a1 1 0 102 0v-4h4a1 1 0 100-2h-4V4a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <input
          ref={fileInputRef}
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          required
        />
      </div>
    </div>
  );
});
