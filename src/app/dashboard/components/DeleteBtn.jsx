"use client";
import React, { useState } from "react";

const DeleteBtn = () => {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <>
      {confirmDelete ? (
        <div className="absolute inset-0 z-50 flex items-center gap-2 justify-center flex-col">
          <p className=" font-bold text-gray-800 w-4/5">
            Are you sure you want to delete this?
          </p>
          <div className="flex gap-2">
            <button className="btn btn-sm">delete</button>
            <button
              className="btn btn-sm"
              onClick={() => setConfirmDelete(false)}
            >
              cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <button className="btn btn-sm">Edit Post</button>
          <button className="btn btn-sm" onClick={() => setConfirmDelete(true)}>
            Delete Post
          </button>
        </>
      )}
    </>
  );
};

export default DeleteBtn;
