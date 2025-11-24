"use client";
import WodBlock from "@/components/wod-block";
import { HistoryBlock } from "@/components/history-block";
import { ContentBox } from "@/components/content-block";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

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

export default function DashboardClient({ user }) {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Log[]>([]);

  // BUG 🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝
  // When you read the page for the first time, evern with the record, it thinks you don't have the record and you can add the same item more than twise

  const userId = user?.id ?? null;
  // [1] Fetch  History
  useEffect(() => {
    const loadHistory = async () => {
      const supabase = createClient();

      if (!userId) {
        console.log(">>>>> No user logged in");
        setLoading(false);

        return;
      }

      // Fetch History
      const { data: logs, error: logsError } = await supabase
        .from("user_logs")
        .select("*, wod:wods(*)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (logsError) {
        console.error("Error fetching history:", logsError);
        setLoading(false);
      } else {
        console.log(">>>> Log:", logs);
        setHistory(logs as Log[]);
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  // Update the history component when user logged WOD
  const refreshHistory = async () => {
    const supabase = createClient();
    if (!userId) return;

    const { data: logs } = await supabase
      .from("user_logs")
      .select("*, wod:wods(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setHistory(logs as Log[]);
  };

  if (loading) {
    return <p className="text-center py-10">Checking login...</p>;
  }

  return (
    <>
      <ContentBox title="Today's WOD">
        <WodBlock userId={userId} onLogged={() => refreshHistory()} />
      </ContentBox>
      <ContentBox title="Workout History">
        <HistoryBlock logs={history} userId={userId} dashboard={true} />
      </ContentBox>
    </>
  );
}
