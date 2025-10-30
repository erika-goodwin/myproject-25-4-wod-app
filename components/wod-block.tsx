// import { createClient } from "@/lib/supabase/server";
import { Button } from "./ui/button";
// import { useState } from "react";

type Wod = {
  id: string;
  name: string;
  exercises: string[];
  date: string;
};

export default async function WodBlock() {
  // const supabase = await createClient();

  const wod = await fetch("http://localhost:3000/api/today", {
    cache: "no-store",
  }).then((res) => {
    console.log("Response status:", res.status);
    console.log("Response ok:", res.ok);
    console.log("Response json:", res.json());

    return res.json();
  });

  // .then((data) => console.log(">>>> data", data));

  // const { data, error } = await supabase
  //   .from("wods")
  //   .select("*")
  //   .eq("date", "2025-10-29"); // modify depending on your table & filter

  // if (error) {
  //   console.error("Supabase error:", error);
  //   return <div>Error loading data</div>;
  // }

  console.log(">>>>> fetchData:", wod);

  // const wod = data[0];

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
