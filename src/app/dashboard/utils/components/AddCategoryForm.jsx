"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { CiCircleRemove } from "react-icons/ci";
import fetchInstaceClientSide from "@/lib/fetchApi/fetchInstanceClientSide";

export default React.memo(function AddCategoryForm({
  type = "posts",
  setUpdateAgain,
}) {
  const [subCategories, setSubCategories] = useState([]);
  const subCategInputRef = useRef();
  const [noSubCateg, setNoSubCateg] = useState(false);
  const mainCategoryName = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(null);

  useEffect(() => {
    subCategInputRef.current.value = "";
  }, [subCategories]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (subCategories.length === 0) {
      setNoSubCateg(true);
      setTimeout(() => {
        setNoSubCateg(false);
      }, 3000);
      return;
    }

    try {
      setIsLoading(true);
      const categoriesAdded = await fetchInstaceClientSide("/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: mainCategoryName.current.value,
          childCategories: subCategories,
          type,
        }),
      });

      if (categoriesAdded.status === 201) {
        setIsAdded(true);
        mainCategoryName.current.value = "";
        subCategInputRef.current.value = "";
        setSubCategories([]);
        setUpdateAgain((prev) => prev + 1);
        setTimeout(() => {
          setIsAdded(false);
        }, 3000);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  }

  return (
    <div className="w-max max-w-sm mx-auto border-2 border-gray-500/50 rounded-lg p-10 mt-10">
      <form className="space-y-2" onSubmit={handleSubmit}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Enter Category Name</span>
          </label>
          <input
            type="text"
            placeholder="Category Name"
            className="input input-md w-full max-w-xs focus:outline-none"
            onClick={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
              }
            }}
            ref={mainCategoryName}
            minLength={5}
            required
          />
        </div>

        <div className="w-full">
          <ul className="w-full flex flex-wrap gap-2">
            {subCategories &&
              subCategories.map((item, ind) => (
                <li
                  key={ind}
                  className="relative max-w-max px-4 py-2 bg-neutral rounded-full text-secondary group cursor-pointer text-sm"
                  onClick={() =>
                    setSubCategories((prev) =>
                      prev.filter((subCateg) => subCateg !== item)
                    )
                  }
                >
                  <span className="text-neutral-content">{item}</span>
                  <span className="absolute top-0 left-0 w-full h-full hidden group-hover:flex justify-center items-center bg-neutral z-20 rounded-full">
                    <CiCircleRemove size={"1.25rem"} color={"red"} />
                  </span>
                </li>
              ))}
          </ul>
        </div>

        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Add Subcategory"
              className="input outline-none focus:outline-none"
              ref={subCategInputRef}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  setSubCategories((prev) => {
                    if (subCategInputRef.current.value) {
                      return [...prev, subCategInputRef.current.value];
                    }
                    return prev;
                  });
                }
              }}
            />
            <button
              className="btn btn-square"
              onClick={() =>
                setSubCategories((prev) => {
                  if (subCategInputRef.current.value) {
                    return [...prev, subCategInputRef.current.value];
                  }
                  return prev;
                })
              }
            >
              <IoIosAdd />
            </button>
          </div>
        </div>
        {noSubCateg && (
          <p className="text-red-500/70 text-xs px-2 font-bold">
            Please add atleast one subcategory
          </p>
        )}

        <div className="w-full">
          <button type="submit" className="btn btn-block mx-auto">
            Submit
          </button>
        </div>
        {isAdded === true && (
          <div className="bg-green-600 py-2 rounded-md text-white px-2 text-xs flex justify-center items-center">
            <p>Successfully Added!</p>
          </div>
        )}
      </form>
    </div>
  );
});
