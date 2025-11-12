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

export default function DashboardClient() {
  const [authLoading, setAuthLoading] = useState(true);
  //   const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  //   const [user, setUser] = useState(null);
  const [history, setHistory] = useState<Log[]>([]);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // [1] Fetch User & History
  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      const { data: userData, error: userError } =
        await supabase.auth.getUser();
      console.log(">>>>> fetchUser ====", userData.user);

      if (userError) {
        console.error("Error fetching user:", userError);
        // setLoading(false);
        setAuthLoading(false);
        return;
      }

      if (!userData?.user || userData?.user === null) {
        console.log(">>>>> No user logged in");
        setUserLoggedIn(false);
        setAuthLoading(false);
      }

      setAuthLoading(false);

      //   if (userData?.user) {
      console.log(
        ">>>>> User found: user",
        userData.user,
        "userId:",
        userData.user.id
      );
      //   setUser(userData.user);
      setUserId(userData.user.id);
      setUserLoggedIn(true);

      const { data: logs, error: logsError } = await supabase
        .from("user_logs")
        .select("*, wod:wods(*)")
        .eq("user_id", userData.user.id)
        .order("created_at", { ascending: false });

      //   debugger;

      if (logsError) {
        console.error("Error fetching history:", logsError);
      } else {
        console.log(">>>> Log:", logs);
        setHistory(logs as Log[]);
      }

      setAuthLoading(true);
      setAuthLoading(false); // 🔥 this unblocks rendering
    };
    fetchUser();
  }, []);

  if (authLoading) {
    return <p className="text-center py-10">Checking login...</p>;
  }

  return (
    <>
      <ContentBox title="Today's WOD">
        <WodBlock userId={userId} userLoggedIn={userLoggedIn} />
      </ContentBox>
      <ContentBox title="Workout History">
        <HistoryPage logs={history} userLoggedIn={userLoggedIn} />
      </ContentBox>
    </>
  );
}
