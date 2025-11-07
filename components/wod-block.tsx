"use client";
import { useEffect, useEffectEvent, useState } from "react";
import { Button } from "./ui/button";
import { logWorkout } from "@/lib/api";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

type Wod = {
  id: string;
  name: string;
  exercises: string[];
  date: string;
};

export default function WodBlock() {
  const [wod, setWod] = useState<Wod | null>(null);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [note, setNote] = useState("");
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [userId, setUserId] = useState("");
  const [userLoggedIn, setUSerLoggedIn] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      console.log(">>>>> fetchUser ====");

      if (error) {
        console.error("Error fetching user:", error);
      }

      if (data?.user) {
        console.log(">>>>> User found:", data.user);
        setUserId(data.user.id);
        setUSerLoggedIn(true);
      } else {
        console.log(">>>>> No user logged in");
        setUSerLoggedIn(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchWod = async () => {
      try {
        console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
        console.log(
          "Supabase Key defined:",
          !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        const supabase = createClient();
        const today = new Date();
        // const today = new Date().toISOString().split("T")[0];
        const localDate = today.toLocaleDateString("en-CA");
        // const today = "2025-10-29";

        // console.log(">>>>> localDate:", localDate);
        // console.log(
        //   ">>> All WODs:",
        //   await supabase.from("wods").select("id, name, date")
        // );

        const { data, error } = await supabase
          .from("wods")
          .select("*")
          .eq("date", localDate)
          .single();

        if (error) {
          console.log(">>>>> Error fetching WODs:", error);
          return;
        }

        console.log(">>> Fetched WOD:", data);

        setWod(data);
      } catch (err) {
        console.error(">>> Unexpected WOD:", err);
      } finally {
        setLoading(false);
      }
      // With fake API
      // try {
      //   const baseUrl =
      //     process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      //   const res = await fetch(`${baseUrl}/api/today`, { cache: "no-store" });

      //   if (!res.ok) {
      //     throw new Error(`Failed to fetch WOD: ${res.status}`);
      //   }

      //   const data = await res.json();
      //   console.log(">>> Fetched WOD:", data);

      //   setWod(data);
      // } catch (error) {
      //   console.error(">>> Error loading WOD:", error);
      // } finally {
      //   setLoading(false);
      // }
    };

    fetchWod();
  }, []);

  const handleClickDone = () => {
    if (!userLoggedIn) {
      redirect("/auth/login");
    }

    console.log(">>> Logging workout...", { userId, wodId: wod?.id, note });

    logWorkout(userId, wod?.id, note);
    console.log("✅ Workout logged successfully:", {
      userId,
      wodId: wod?.id,
      note,
    });

    setDone(!done);
  };

  if (loading) {
    return <p>Loading ... </p>;
  }

  if (!wod) {
    return <p>Failed to load workout data.</p>;
  }

  return (
    <>
      <div className="">
        <p className="text-end">{wod.date}</p>
      </div>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-4xl font-extrabold tracking-tight">
          {wod.name}
        </span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        {(wod.exercises as string[]).map((exercise, index) => (
          <li key={`${wod.id}-${index}`} className="flex items-center">
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
              {exercise}
            </span>
          </li>
        ))}
      </ul>

      {showNoteInput && (
        <div className="mb-4">
          <form className="" action="" method="">
            <label>
              Note: <span className="text-sm">Scaled? How did you feel?</span>
            </label>
            <input
              type="text"
              name="wodNote"
              id="wodNote"
              value={note}
              className="border border-gray-300 rounded-md p-2 w-full text-charcoal"
              onChange={(e) => setNote(e.target.value)}
            />
          </form>
        </div>
      )}

      <div className="flex flex-row gap-2">
        <Button
          size="sm"
          variant={"default"}
          onClick={() => handleClickDone()}
          disabled={done}
        >
          {done ? "Well Done" : "Mark as Done"}
        </Button>
        <Button
          size="sm"
          variant={"outline"}
          onClick={() => setShowNoteInput(true)}
          disabled={showNoteInput || done}
        >
          Add Notes
        </Button>
      </div>
    </>
  );
}
