"use client";

import { HistoryBlock } from "@/components/history-block";
import { ContentBox } from "@/components/content-block";
// import { createClient } from "@/lib/supabase/client";
// import { useEffect, useState } from "react";
import { useUserHistory } from "@/hooks/useUserHistory";

export default function HistoryBoard({ user }) {
  // const [loading, setLoading] = useState(true);
  // const [history, setHistory] = useState<Log[]>([]);

  const userId = user?.id ?? null;

  const { loading, history } = useUserHistory(userId);

  // // [1] Fetch  History
  // useEffect(() => {
  //   const loadHistory = async () => {
  //     const supabase = createClient();

  //     if (!userId) {
  //       console.log(">>>>> No user logged in");
  //       setLoading(false);

  //       return;
  //     }

  //     // Fetch History
  //     const { data: logs, error: logsError } = await supabase
  //       .from("user_logs")
  //       .select("*, wod:wods(*)")
  //       .eq("user_id", user.id)
  //       .order("created_at", { ascending: false });

  //     if (logsError) {
  //       console.error("Error fetching history:", logsError);
  //       setLoading(false);
  //     } else {
  //       console.log(">>>> Log:", logs);
  //       setHistory(logs as Log[]);
  //       setLoading(false);
  //     }
  //   };
  //   loadHistory();
  // }, []);

  if (loading) {
    return <p className="text-center py-10">Checking login...</p>;
  }

  return (
    <>
      <ContentBox title="Workout History">
        <HistoryBlock logs={history} userId={userId} dashboard={false} />
      </ContentBox>
    </>
  );
}
