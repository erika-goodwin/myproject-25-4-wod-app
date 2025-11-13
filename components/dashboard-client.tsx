"use client";
import WodBlock from "@/components/wod-block";
import { HistoryPage } from "@/components/history-block";
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
  //   const [authLoading, setAuthLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  //   const [userId, setUserId] = useState(null);
  //   const [user, setUser] = useState(null);
  const [history, setHistory] = useState<Log[]>([]);
  //   const [userLoggedIn, setUserLoggedIn] = useState(false);

  const userId = user?.id ?? null;
  // [1] Fetch  History
  useEffect(() => {
    const loadHistory = async () => {
      const supabase = createClient();

      //   console.log(">>>>> loadHistory ====", userData.user);

      if (!userId) {
        // console.error("Error fetching user:", userFetchError);
        console.log(">>>>> No user logged in");
        setLoading(false);
        // setAuthLoading(false);
        return;
      }

      //   if (!userData?.user || userData?.user === null) {
      //     console.log(">>>>> No user logged in");
      //     // setUserLoggedIn(false);
      //     setAuthLoading(false);
      //   }

      //   setUserLoggedIn(true);
      //   setAuthLoading(false);

      //   if (userData?.user) {
      //   console.log(
      //     ">>>>> User found: user",
      //     userData.user,
      //     "userId:",
      //     userData.user.id
      //   );
      //   setUser(userData.user);
      //   setUserId(user.id);
      //   setUserLoggedIn(true);

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
        // setAuthLoading(false);
      }

      //   debugger;
      //
      //   setAuthLoading(true);
      //   setAuthLoading(false); // 🔥 this unblocks rendering
      //   console.log(">>>>>> 🔥 userLoggedIn:", userLoggedIn);
    };
    loadHistory();
  }, []);

  // CHECK HERE TOMORROW IF THE LOAD WILL BE UPDATED 🔥🔥🔥🔥🔥🔥🔥🔥🔥

  const refreshHistory = async () => {
    console.log(">>>> refresh History == New Logs ==");

    const supabase = createClient();
    if (!userId) return;

    const { data: logs } = await supabase
      .from("user_logs")
      .select("*, wod:wods(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    console.log(">>>> Log:", logs);
    setHistory(logs as Log[]);
  };

  if (loading) {
    return <p className="text-center py-10">Checking login...</p>;
  }

  //   debugger;

  return (
    <>
      <ContentBox title="Today's WOD">
        <WodBlock userId={userId} onLogged={() => refreshHistory()} />
      </ContentBox>
      <ContentBox title="Workout History">
        <HistoryPage logs={history} userId={userId} />
      </ContentBox>
    </>
  );
}
