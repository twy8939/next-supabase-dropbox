"use client";

import React from "react";
import Logo from "components/logo";
import SearchComponent from "components/search-component";
import FileDragDropZone from "components/file-drag-dropzone";
import ImageList from "components/image-list";

export default function UI() {
  const [searchInput, setSearchInput] = React.useState("");
  return (
    <main className="w-full p-4 flex-col flex gap-4">
      <Logo />

      <SearchComponent
        searchInput={searchInput}
        setSearchInput={setSearchInput}
      />

      <FileDragDropZone />

      <ImageList searchInput={searchInput} />
    </main>
  );
}
