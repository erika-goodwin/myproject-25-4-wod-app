import DashboardClient from "@/components/dashboard-client";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
    // userFetchError,
  } = await supabase.auth.getUser();

  return <DashboardClient user={user} />;
}
