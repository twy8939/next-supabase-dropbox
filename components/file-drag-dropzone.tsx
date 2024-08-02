"use client";

import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { uploadFile } from "actions/storageActions";
import { queryClient } from "config/ReactQueryClientProvider";
import { useRef } from "react";

export default function FileDragDropZone() {
  const fileRef = useRef(null);
  const uploadImageMutation = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["images"] });
    },
  });

  const handleSubmitClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileRef.current.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const result = await uploadImageMutation.mutate(formData);

      console.log(result);
    }
  };

  return (
    <form
      onSubmit={handleSubmitClick}
      className="w-full py-20 border-4 border-dotted border-indigo-700 flex flex-col items-center"
    >
      <input type="file" ref={fileRef} />
      <p>파일을 여기에 끌어다 놓거나 클릭하여 업로드하세요.</p>
      <Button loading={uploadImageMutation.isPending} type="submit">
        파일 업로드
      </Button>
    </form>
  );
}
