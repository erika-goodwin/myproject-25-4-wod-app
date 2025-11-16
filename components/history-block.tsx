"use client";
import Link from "next/link";

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

export function HistoryBlock({
  logs,
  userId,
  dashboard,
}: {
  logs: Log[];
  userId: any;
  dashboard: boolean;
}) {
  console.log(">>>>> history component:", userId, logs);

  const historyLog = dashboard ? logs.slice(0, 3) : logs;

  console.log(">>>> historyLog check:,", dashboard);

  return (
    <div className=" flex flex-col gap-16 items-center">
      {userId ? (
        <div className="w-full">
          <ul role="list" className=" divide-y divide-default">
            {historyLog.map((log) => (
              <li key={log.id} className="py-4 sm:py-4 border-b">
                <div className="flex items-center gap-2">
                  <div className="flex-1 min-w-0 ms-2">
                    <p className="font-medium text-heading truncate">
                      {log.wod.name}
                    </p>
                    {log.wod.exercises.map((exercise, index) => (
                      <p
                        key={`excercise-${index + 1}`}
                        className="text-sm text-body truncate"
                      >
                        {exercise}
                      </p>
                    ))}
                  </div>
                  <div className="inline-flex items-center font-medium text-heading">
                    {log.wod.date}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {dashboard && (
            <div className="flex justify-center">
              <Link href="/history">See more</Link>
            </div>
          )}
        </div>
      ) : (
        <>
          <p>
            <Link href="/auth/login" className="ml-2">
              Login to see your logs
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
