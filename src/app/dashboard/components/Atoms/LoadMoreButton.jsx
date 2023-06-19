"use client";
import React, { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

const LoadMoreButton = ({ onClick, isLoading = false, disabled = false }) => {
  return (
    <div className="flex justify-center">
      <button
        className="py-4 px-8 rounded-md bg-primary text-slate-100 font-bold flex gap-2 text-lg items-center disabled:opacity-60"
        onClick={() => {
          onClick();
        }}
        disabled={disabled}
      >
        Next
        <span className={`${isLoading ? "animate-spin" : ""}`}>
          <FiRefreshCcw size={"1.2rem"} />
        </span>
      </button>
    </div>
  );
};

export default LoadMoreButton;
