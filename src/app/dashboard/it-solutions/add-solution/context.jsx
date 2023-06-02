import { createContext, useContext, useState } from "react";

const CreateSolution = createContext();

export function CreateITSolutionProvider({ children }) {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(null);
  const [subCategory, setSubCategory] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [markdownToSubmit, setMarkdownToSubmit] =
    useState("**Hello world!!!**");

  function resetAll() {
    setTitle(null);
    setDescription(null);
    setCategory(null);
    setSubCategory(null);
    setSelectedImage(null);
    setMarkdownToSubmit("**Hello world!!!**");
  }

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
    resetAll,
  };

  return (
    <CreateSolution.Provider value={values}>{children}</CreateSolution.Provider>
  );
}

export function useCreateITSolution() {
  return useContext(CreateSolution);
}
