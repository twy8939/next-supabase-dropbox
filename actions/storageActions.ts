"use server";

import { createServerSupabaseClient } from "supabase/server";

function handleError(error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const file = formData.get("file") as File;

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .upload(file.name, file, { upsert: true });

  handleError(error);

  return data;
}
