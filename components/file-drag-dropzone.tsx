"use client";

import { Button, Spinner } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "actions/storageActions";
import { queryClient } from "config/ReactQueryClientProvider";
import { useDropzone } from "react-dropzone";

export default function FileDragDropZone() {
  // const fileRef = useRef(null);
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["images"] });
    },
  });

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const formData = new FormData();

      acceptedFiles.forEach((file) => {
        formData.append("file", file);
      });

      const result = await uploadImageMutation.mutate(formData);

      console.log(result);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <div
      className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center cursor-pointer"
      {...getRootProps()}
    >
      <input type="file" {...getInputProps()} />
      {uploadImageMutation.isPending ? (
        <Spinner />
      ) : isDragActive ? (
        <p>파일을 놓아주세요.</p>
      ) : (
        <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      )}
    </div>
  );
}
