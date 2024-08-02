"use client";

import { useQuery } from "@tanstack/react-query";
import ImageItem from "./image-item";
import { searchFiles } from "actions/storageActions";
import { Spinner } from "@material-tailwind/react";

export default function ImageList({ searchInput }: { searchInput: string }) {
  const searchImageQuery = useQuery({
    queryKey: ["images", searchInput],
    queryFn: () => searchFiles(searchInput),
  });
  return (
    <section className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2">
      {searchImageQuery.isPending && <Spinner />}
      {searchImageQuery.data &&
        searchImageQuery.data.map((image) => (
          <ImageItem key={image.id} image={image} />
        ))}
    </section>
  );
}
