import HistoryBoard from "@/components/historyboard-client";
import { createClient } from "@/lib/supabase/server";

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
    // userFetchError,
  } = await supabase.auth.getUser();

  // };

  return <HistoryBoard user={user} />;
}
