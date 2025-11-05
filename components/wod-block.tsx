import { Button } from "./ui/button";

type Wod = {
  id: string;
  name: string;
  exercises: string[];
  date: string;
};

export default async function WodBlock() {
  // const supabase = await createClient();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const wod: Wod = await fetch(`${baseUrl}/api/today`, {
    cache: "no-store",
  }).then((res) => {
    console.log("Response status:", res.status);
    console.log("Response ok:", res.ok);
    // const text = res.text();
    const data = res.json();
    // console.log("Response text:", text);
    console.log("Response json:", data);

    return data;
  });
  console.log(">>>>> fetchData:", wod);

  // const wod = data[0];

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
