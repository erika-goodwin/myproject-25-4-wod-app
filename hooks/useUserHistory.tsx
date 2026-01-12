"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Wod = {
  date: string;
  exercise: [];
  id: string;
  name: string;
};

type Log = {
  id: string;
  user_id: string;
  wod_id: string;
  completed: boolean;
  create_at: string;
  note: string;
  wod: Wod[];
};

export function useUserHistory(userId: string | null) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Log[]>([]);

  //   // [1] Fetch  History
  //   useEffect(() => {
  //     const loadHistory = async () => {
  //       const supabase = createClient();

  //       if (!userId) {
  //         console.log(">>>>> No user logged in");
  //         setLoading(false);

  //         return;
  //       }

  //       // Fetch History
  //       const { data: logs, error: logsError } = await supabase
  //         .from("user_logs")
  //         .select("*, wod:wods(*)")
  //         .eq("user_id", userId)
  //         // .eq("user_id", user.id)
  //         .order("created_at", { ascending: false });

  //       if (logsError) {
  //         console.error("Error fetching history:", logsError);
  //         setLoading(false);
  //       } else {
  //         console.log(">>>> Log:", logs);
  //         setHistory(logs as Log[]);
  //         setLoading(false);
  //       }
  //     };
  //     loadHistory();
  //   }, []);

  //   //   Update the history component when user logged WOD
  //   const refreshHistory = async () => {
  //     const supabase = createClient();
  //     if (!userId) return;

  //     const { data: logs } = await supabase
  //       .from("user_logs")
  //       .select("*, wod:wods(*)")
  //       .eq("user_id", userId)
  //       //   .eq("user_id", user.id)
  //       .order("created_at", { ascending: false });

  //     setHistory(logs as Log[]);
  //   };

  const fetchHistory = useCallback(async () => {
    // if (!userId) return;

    if (!userId) {
      console.log(">>>>> No user logged in");
      setLoading(false);

      return;
    }

    // setLoading(true);

    const supabase = createClient();

    // Fetch History
    const { data: logs, error: logsError } = await supabase
      .from("user_logs")
      .select("*, wod:wods(*)")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (logsError) {
      console.error("Error fetching history:", logsError);
      // setLoading(false);
    } else {
      console.log(">>>> Log:", logs);
      setHistory(logs as Log[]);
      console.log(">>>> Log: history", history);
      setLoading(false);
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
