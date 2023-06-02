"use client";
import React, { useEffect, useState } from "react";

import fetchCategories from "@/lib/fetchCategoriesClient";
import { useCreatePost } from "../context";

const CategoriesSelector = React.memo(() => {
  const { category, setCategory, subCategory, setSubCategory } =
    useCreatePost();

  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchCategoriesFunction = async () => {
      const fetchedCategories = await fetchCategories();
      fetchedCategories && setCategories(fetchedCategories);
    };
    fetchCategoriesFunction();
  }, []);

  return (
    categories && (
      <div className="grid col-span-2">
        <DropdownSelection
          label={"category"}
          options={categories.map((categObj) => categObj.category)}
          onChange={(e) => setCategory(e.target.value)}
          value={category || ""}
        />
        <DropdownSelection
          label={"sub category"}
          options={
            categories.filter((categObj) => categObj?.category === category)[0]
              ?.childCategories || []
          }
          disabled={!!!category}
          onChange={(e) => setSubCategory(e.target.value)}
          value={subCategory}
        />
      </div>
    )
  );
});

function DropdownSelection({ label, options, onChange, value, disabled }) {
  return (
    <div className="flex flex-col text-xs">
      <label htmlFor="dropdown" className="mr-2 text-lg font-medium">
        {label}
      </label>
      <select
        id="dropdown"
        required
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
        className=" px-2 py-3 border border-gray-300 rounded-md outline-none focus:border-primary disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <option value="" className="text-sm">
          None
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-sm">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CategoriesSelector;
