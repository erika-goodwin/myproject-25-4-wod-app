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

  if (error) throw error;
  return data;
}
