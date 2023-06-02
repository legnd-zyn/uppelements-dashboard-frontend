import { createContext, useContext, useState } from "react";

const CreatePost = createContext();

export function CreatePostProvider({ children }) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [markdownToSubmit, setMarkdownToSubmit] =
    useState("**Hello world!!!**");

  const values = {
    title,
    setTitle,
    description,
    setDescription,
    category,
    setCategory,
    subCategory,
    setSubCategory,
    selectedImage,
    setSelectedImage,
    markdownToSubmit,
    setMarkdownToSubmit,
  };

  return <CreatePost.Provider value={values}>{children}</CreatePost.Provider>;
}

export function useCreatePost() {
  return useContext(CreatePost);
}
