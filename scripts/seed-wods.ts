import { supabaseAdmin } from "./supabase-admin";
// import { supabaseAdmin } from "./supabase-admin.ts";
import { readFileSync } from "node:fs";

const wods = JSON.parse(
  readFileSync(new URL("../data/wods.json", import.meta.url), "utf-8")
);

async function seed() {
  const { data, error } = await supabaseAdmin
    .from("wods")
    .upsert(wods, { onConflict: "day" });

  console.log(">>>>>> data", data);
  console.log(">>>>>> error", error);

  if (error) {
    console.error(error);
  } else {
    console.log("✅ WODs seeded : ", data);
  }
}

seed();

// Run manually
// node scripts/seed-wods.ts
