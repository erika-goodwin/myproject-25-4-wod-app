import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET the all data of WODS
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("wods").select("*");
  // .eq("date", "2025-10-29");

  console.log(">>>>>> data", data);
  console.log(">>>>>> error", error);

  if (error) {
    return NextResponse.json({ ok: false, error: error.message });
  }

  return NextResponse.json({ ok: true, count: data.length });
}
