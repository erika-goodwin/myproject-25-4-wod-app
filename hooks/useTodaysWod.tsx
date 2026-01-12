"use client";
import { useEffect, useState } from "react";
import { Wod } from "@/types/wod";
import { logWorkout } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export function useTodaysWod(userId: string | null, onLogged?: () => void) {
  const [wod, setWod] = useState<Wod | null>(null);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [note, setNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);

  // [2] Fetch Today's WOD
  useEffect(() => {
    const fetchWod = async () => {
      try {
        const supabase = createClient();
        const today = new Date();
        // const today = new Date().toISOString().split("T")[0];
        const day = today.getDate();

        // console.log(">>>>> checking day:", today, day);

        const { data, error } = await supabase
          .from("wods")
          .select("*")
          .eq("day", day)
          .single();

        if (error) {
          console.log(">>>>> Error fetching WODs:", error);
          return;
        }

        // console.log(">>> Fetched WOD:", data);

        setWod(data);
        
      } catch (err) {
        console.error(">>> Unexpected WOD:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWod();
  }, []);

  // [3] Check if user already logged today's WOD
  useEffect(() => {
    const checkIfDone = async () => {
      if (!userId || !wod?.id) return;

      // console.log(">>>>>> log is done? ============", !userId || !wod?.id);

      const supabase = createClient();
      const { data, error } = await supabase
        .from("user_logs")
        .select()
        .eq("user_id", userId)
        .eq("wod_id", wod.id)
        .single();

      if (error) {
        console.error("Error checking workout log:", error);
        return;
      }

      if (data) {
        // console.log(">>>>>> WOD already logged today:", data);
        setDone(true);
      }
    };

    checkIfDone();
  }, [userId]);

  //[4] Handle mark As Done
  const handleClickDone = async () => {
    if (!userId) {
      toast("Please login first", {
        icon: "🔑",
      });
      redirect("/auth/login");
      // return;
    }

    if (done) return;

    // console.log(">>> Logging workout...", { userId, wodId: wod?.id, note });

    if (!wod?.id) {
      toast.error("WOD data not logged yet.");
      return;
    }

    const { error } = await logWorkout(userId, wod?.id, note);
    // console.log("✅ Workout logged successfully:", {
    //   userId,
    //   wodId: wod?.id,
    //   note,
    // });
    if (error) {
      toast.error("❌ Couldn’t save workout. Please try again.");
    } else {
      toast("Good Job!", {
        icon: "👏",
      });

      // Clean up WOD
      setDone(!done);
      setNote("");
      setShowNoteInput(false);

      // History update
      onLogged?.();
    }
  };

  return {
    wod,
    loading,
    done,
    note,
    setNote,
    showNoteInput,
    setShowNoteInput,
    handleClickDone,
  };
}
