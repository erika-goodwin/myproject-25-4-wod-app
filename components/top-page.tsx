import { Button } from "./ui/button";

export function WodPage() {
  return (
    <>
      <div className="flex items-baseline text-gray-900 dark:text-white">
        <span className="text-4xl font-extrabold tracking-tight">
          Title here
        </span>
      </div>
      <ul role="list" className="space-y-5 my-7">
        <li className="flex items-center">
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            workout 1
          </span>
        </li>
        <li className="flex">
          <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">
            workout2
          </span>
        </li>
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
