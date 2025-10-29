import { createClient } from "@/lib/supabase/server";
import { Button } from "./ui/button";
// import { useState } from "react";

export default async function WodBlock() {
  // const [error, setError] = useState<string | null>(null);

  // const fetchData = async () => {
  //   const supabase = await createClient();
  //   try {
  //     const { data, error } = await supabase.from("wods").select("*");

  //     return data;
  //   } catch (error) {
  //     // setError(error instanceof Error ? error.message : "An error occurred");
  //     console.log(">>>>> error:", error);
  //   }
  // };

  // const data = fetchData();

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wods")
    .select("*")
    .eq("date", "2025-10-29"); // modify depending on your table & filter

  if (error) {
    console.error("Supabase error:", error);
    return <div>Error loading data</div>;
  }

  console.log(">>>>> fetchData:", data);

  const wod = data[0];

  return (
    <>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-4xl font-extrabold tracking-tight">
          {wod.name}
        </span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        {(wod.exercises as string[]).map((exercise) => (
          <li className="flex items-center">
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
              {exercise}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-row gap-2">
        <Button size="sm" variant={"default"}>
          Mark as Done
        </Button>
        <Button size="sm" variant={"outline"}>
          Add Notes
        </Button>
      </div>
    </>
  );
}
