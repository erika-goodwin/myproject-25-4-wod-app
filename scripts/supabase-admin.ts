import "dotenv/config";

import { createClient } from "@supabase/supabase-js";

console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
console.log(
  "HAS SERVICE ROLE KEY:",
  Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY)
);

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
