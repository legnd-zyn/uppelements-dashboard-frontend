"use client";
import PostCard from "@/app/dashboard/components/PostCard";
import fetchInstanceClientSide from "@/lib/fetchApi/fetchInstanceClientSide";
import React, { useEffect, useMemo, useState } from "react";
import { GrClose } from "react-icons/gr";
import { PopUpComponent } from "./PopUpComponent";

function ModeratorCard({ moderatorObj }) {
  const [popupOpen, setPopupOpen] = useState(false);
  return (
    <div
      type="button"
      className=" cursor-pointer  text-center p-5 w-full max-w-[250px] bg-white rounded-md"
      onClick={(e) => {
        // console.log(e.target.classList.contains("card"));
        if (e.target.classList.contains("card")) {
          setPopupOpen((prev) => !prev);
        }
      }}
    >
      <div className=" card prose prose-headings:text-gray-700 prose-headings:m-0 prose-p:m-0 prose-p:text-gray-500">
        <h2 className="pointer-events-none">{moderatorObj.user.username}</h2>
        <p className="pointer-events-none">{moderatorObj.user.role}</p>
        <p className="pointer-events-none">
          posts : {moderatorObj.user.totalPosts}
        </p>{" "}
      </div>
      {popupOpen && (
        <PopUpComponent
          moderator={moderatorObj.user}
          handlePopup={() => setPopupOpen((prev) => !prev)}
        />
      )}
    </div>
  );
}

export default ModeratorCard;
