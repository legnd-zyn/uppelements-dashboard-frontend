"use client";
import React from "react";
import MDEditorComponent from "./components/MDEditor";
import ITSolutionMetaDetaWrapper from "./components/PostMetaDetaWrapper";
import { CreateITSolutionProvider } from "./context";

export default React.memo(function page() {
  return (
    <CreateITSolutionProvider>
      <div className="w-full mx-auto p-10 border-2 space-y-5">
        <ITSolutionMetaDetaWrapper />
        <MDEditorComponent />
      </div>
    </CreateITSolutionProvider>
  );
});
