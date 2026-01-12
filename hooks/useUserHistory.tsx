"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Log } from "@/types/log";

export function useUserHistory(userId: string | null) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Log[]>([]);

  const fetchHistory = useCallback(async () => {
    if (!userId) {
      //   console.log(">>>>> No user logged in");
      setLoading(false);

      return;
    }

    const supabase = createClient();

    // Fetch History
    const { data: logs, error: logsError } = await supabase
      .from("user_logs")
      .select("*, wod:wods(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (logsError) {
      console.error("Error fetching history:", logsError);
    } else {
      //   console.log(">>>> Log:", logs);
      setHistory(logs as Log[]);
      //   console.log(">>>> Log: history", history);
      //   setLoading(false);
    }

    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    loading,
    history,
    refreshHistory: fetchHistory,
  };
}
