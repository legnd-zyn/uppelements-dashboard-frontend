"use client";
import React, { createContext, useContext, useState } from "react";
import MDEditorComponent from "./components/MDEditor";
import PostMetaDetaWrapper from "./components/PostMetaDetaWrapper";
import { CreatePostProvider } from "./context";

export default React.memo(function page() {
  return (
    <CreatePostProvider>
      <div className="w-full mx-auto p-10 border-2 space-y-5">
        <PostMetaDetaWrapper />
        <MDEditorComponent />
      </div>
    </CreatePostProvider>
  );
});
