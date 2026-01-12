"use client";
import { useTodaysWod } from "@/hooks/useTodaysWod";
// import { useEffect, useState } from "react";
import { Button } from "./ui/button";
// import { logWorkout } from "@/lib/api";
// import { createClient } from "@/lib/supabase/client";
// import { redirect } from "next/navigation";
// import toast from "react-hot-toast";
// import { Wod } from "@/types/wod";
import LoadingSpinner from "@/components/loading-spinner";

// type Wod = {
//   id: string;
//   name: string;
//   exercises: string[];
//   day: number;
//   // date: string;
// };

export default function WodBlock({
  userId,
  onLogged,
}: {
  userId: string | null;
  onLogged?: () => void;
}) {
  // const [wod, setWod] = useState<Wod | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [done, setDone] = useState(false);
  // const [note, setNote] = useState("");
  // const [showNoteInput, setShowNoteInput] = useState(false);

  const {
    wod,
    loading,
    done,
    note,
    setNote,
    showNoteInput,
    setShowNoteInput,
    handleClickDone,
  } = useTodaysWod(userId, onLogged);

  // const today = new Date();
  const today = new Date().toISOString().split("T")[0];

  // // [2] Fetch Today's WOD
  // useEffect(() => {
  //   const fetchWod = async () => {
  //     try {
  //       const supabase = createClient();
  //       const today = new Date();
  //       // const today = new Date().toISOString().split("T")[0];
  //       const day = today.getDate();

  //       // console.log(">>>>> checking day:", today, day);

  //       const { data, error } = await supabase
  //         .from("wods")
  //         .select("*")
  //         .eq("day", day)
  //         .single();

  //       if (error) {
  //         console.log(">>>>> Error fetching WODs:", error);
  //         return;
  //       }

  //       console.log(">>> Fetched WOD:", data);

  //       setWod(data);
  //     } catch (err) {
  //       console.error(">>> Unexpected WOD:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchWod();
  // }, []);

  // // [3] Check if user already logged today's WOD
  // useEffect(() => {
  //   const checkIfDone = async () => {
  //     if (!userId || !wod?.id) return;

  //     // console.log(">>>>>> log is done? ============", !userId || !wod?.id);

  //     const supabase = createClient();
  //     const { data, error } = await supabase
  //       .from("user_logs")
  //       .select()
  //       .eq("user_id", userId)
  //       .eq("wod_id", wod.id)
  //       .single();

  //     if (error) {
  //       console.error("Error checking workout log:", error);
  //       return;
  //     }

  //     if (data) {
  //       // console.log(">>>>>> WOD already logged today:", data);
  //       setDone(true);
  //     }
  //   };

  //   checkIfDone();
  // }, [userId]);

  // //[4] Handle mark As Done
  // const handleClickDone = async () => {
  //   if (!userId) {
  //     toast("Please login first", {
  //       icon: "🔑",
  //     });
  //     redirect("/auth/login");
  //     // return;
  //   }

  //   if (done) return;

  //   // console.log(">>> Logging workout...", { userId, wodId: wod?.id, note });

  //   if (!wod?.id) {
  //     toast.error("WOD data not logged yet.");
  //     return;
  //   }

  //   const { error } = await logWorkout(userId, wod?.id, note);
  //   // console.log("✅ Workout logged successfully:", {
  //   //   userId,
  //   //   wodId: wod?.id,
  //   //   note,
  //   // });
  //   if (error) {
  //     toast.error("❌ Couldn’t save workout. Please try again.");
  //   } else {
  //     toast("Good Job!", {
  //       icon: "👏",
  //     });

  //     // Clean up WOD
  //     setDone(!done);
  //     setNote("");
  //     setShowNoteInput(false);

  //     // History update
  //     onLogged?.();
  //   }
  // };

  // [5] US redering
  if (loading) {
    // return <p>Loading ... </p>;
    return <LoadingSpinner text="Loading ..." />;

    // return (
    //   <div className="flex justify-center align-middle">
    //     <p>Loading ... </p>
    //   </div>
    // );
  }

  if (!wod) {
    return <p>Failed to load workout data.</p>;
  }

  return (
    <>
      <div className="">
        <p className="text-end">{today}</p>
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
