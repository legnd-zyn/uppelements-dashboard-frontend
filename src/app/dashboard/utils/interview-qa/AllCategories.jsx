"use client";
import fetchCategoriesClient from "@/lib/fetchCategoriesClient";
import React, { useEffect, useState } from "react";
import CategoriesBlock from "../components/CategoriesBlock";

const AllCategories = ({ updateAgain, setUpdateAgain, type }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    try {
      setIsLoading(true);
      const fetchCategoriesFunction = async () => {
        const res = await fetchCategoriesClient({ type });
        setCategories(res);
      };
      fetchCategoriesFunction();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }, [updateAgain]);

  if (isLoading) {
    return (
      <div className="min-h-[200px] w-full flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-wrap gap-10 items-start">
      {categories.map((props, ind) => (
        <CategoriesBlock
          {...props}
          key={ind}
          setUpdateAgain={setUpdateAgain}
          type={type}
        />
      ))}
    </div>
  );
};

export default AllCategories;
