"use client";
import fetchInstaceClientSide from "@/lib/fetchApi/fetchInstanceClientSide";
import React, { useRef, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";

function CategoriesBlock({
  category,
  childCategories: initChildCategs,
  _id: id,
  setUpdateAgain,
  type,
}) {
  const subCategInputRef = useRef();
  const [inputEmpty, setInputEmpty] = useState(false);
  const [childCategories, setChildCategories] = useState(initChildCategs);

  async function handleAddCategory() {
    if (subCategInputRef?.current?.value.length === 0) {
      setInputEmpty(true);
      setTimeout(() => {
        setInputEmpty(false);
      }, 3000);
      return;
    }

    try {
      const res = await fetchInstaceClientSide(
        `/categories/add-subcategory/${id}`,
        {
          method: "POST",
          body: JSON.stringify({
            subcategory: subCategInputRef.current.value,
          }),
        }
      );
      if (res.ok) {
        const { childCategories } = await res.json();
        setChildCategories(childCategories);
        subCategInputRef.current.value = "";
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function hanndleDeleteWholeProperty() {
    try {
      const res = await fetchInstaceClientSide(
        `/categories/delete-category/${id}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            subcategory: subCategInputRef.current.value,
          }),
        }
      );

      if (res.ok) {
        setUpdateAgain((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex-1 w-[250px] max-w-max bg-base-100 rounded-md overflow-hidden min-w-[200px]">
      <div className="w-full bg-primary-focus px-4 py-4 prose prose-headings:text-slate-100 prose-headings:m-0 flex justify-between items-center">
        <h4>{category}</h4>
        <button
          type="button"
          className="p-2 bg-slate-300 rounded-full flex hover:text-red-500"
          onClick={hanndleDeleteWholeProperty}
        >
          <MdDeleteForever color="" size={"1rem"} />
        </button>
      </div>
      <ul className="menu w-full">
        {childCategories.map((subCategory, ind) => (
          <ChildCategoryList
            key={ind}
            subCategory={subCategory}
            id={id}
            setChildCategories={setChildCategories}
          />
        ))}
      </ul>
      <div className="bg-gray-200 p-2 flex flex-col justify-center items-center">
        <div className="input-group input-group-sm">
          <input
            type="text"
            placeholder="Add Subcategory"
            className="input input-sm max-w-[80%] outline-none focus:outline-none"
            ref={subCategInputRef}
          />
          <button
            className="btn btn-sm btn-square bg-primary hover:bg-primary-focus border-primary-focus hover:border-primary-focus text-slate-100 hover:text-white"
            onClick={handleAddCategory}
          >
            <IoIosAdd size={"1.2rem"} />
          </button>
        </div>
        {inputEmpty && (
          <p className="text-left w-full px-2 text-red-500 text-xs">
            Please add Sub Category
          </p>
        )}
      </div>
    </div>
  );
}

const ChildCategoryList = ({ subCategory, id, setChildCategories }) => {
  const [isError, setIsError] = useState(false);
  async function handleDeleteCategory() {
    try {
      const res = await fetchInstaceClientSide(
        `/categories/add-subcategory/${id}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            subcategory: subCategory,
          }),
        }
      );
      if (res.ok) {
        const { childCategories } = await res.json();
        setChildCategories(childCategories);
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    }
  }

  return (
    <li className="px-6 py-3 text-gray-700 group hover:bg-primary-focus/70 hover:text-slate-100 text-sm flex justify-between flex-row items-center">
      {isError ? (
        <p className="text-red-500 text-xs">Error! retry</p>
      ) : (
        subCategory
      )}
      <button
        type="button"
        onClick={handleDeleteCategory}
        className="p-2 bg-slate-300 rounded-full hidden group-hover:flex group-hover:text-red-500"
      >
        <MdDeleteForever color="" size={"1rem"} />
      </button>
    </li>
  );
};

export default CategoriesBlock;
