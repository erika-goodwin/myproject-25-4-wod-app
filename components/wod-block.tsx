"use client";
import { useTodaysWod } from "@/hooks/useTodaysWod";
import { Button } from "./ui/button";
import LoadingSpinner from "@/components/loading-spinner";

export default function WodBlock({
  userId,
  onLogged,
}: {
  userId: string | null;
  onLogged?: () => void;
}) {
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

  // [5] US redering
  if (loading) {
    // return <p>Loading ... </p>;
    return <LoadingSpinner text="" />;
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
