// /src/lib/api.ts
import { createClient } from "./supabase/client";

export async function logWorkout(
  userId: string,
  wodId: string,
  notes?: string
) {
  const { data, error } = await createClient()
    .from("user_logs")
    .insert([{ user_id: userId, wod_id: wodId, notes, completed: true }]);

  if (error) {
    console.error(">>> Supabase insert error", error);
    throw new Error(error.message || "Failed to log workout");
  }

  console.log(">>> supabase sent without error");
  return { data, error };
}
