"use client";
import React, { useState } from "react";
import AddCategoryForm from "../components/AddCategoryForm";
import AllCategories from "./AllCategories";

export default async function page() {
  const [updateAgain, setUpdateAgain] = useState(0);
  return (
    <div className="container">
      <div className="mx-auto w-full p-4 lg:p-10 lg:w-4/5 bg-base-200 mt-10">
        <div className="prose text-center max-w-none">
          <h1>Manage Interview Q&amp;A Categories</h1>
        </div>

        <AddCategoryForm
          type={"interview-qa"}
          setUpdateAgain={setUpdateAgain}
        />

        <div className="divider my-10" />

        <AllCategories
          updateAgain={updateAgain}
          setUpdateAgain={setUpdateAgain}
          type={"interview-qa"}
        />
      </div>
    </div>
  );
}
