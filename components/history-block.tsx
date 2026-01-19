"use client";
import type { Log } from "@/types/log";
import Link from "next/link";

export function HistoryBlock({
  logs,
  userId,
  dashboard,
}: {
  logs: Log[];
  userId: string | null;
  dashboard: boolean;
}) {
  const historyLog = dashboard ? logs.slice(0, 3) : logs;

  console.log(">>>> historyLog check:,", historyLog);

  function formatDate(dateString: string) {
    return new Date(dateString).toISOString().split("T")[0];
  }

  return (
    <div className=" flex flex-col gap-16 items-center">
      {userId ? (
        <div className="w-full">
          <ul role="list" className=" divide-y divide-default">
            {historyLog.map((log) => (
              <li key={log.id} className="py-4 sm:py-4 border-b">
                <div className="flex flex-col">
                  <div className="flex flex-row items-start gap-2">
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
                    <div className="inline-flex font-medium text-heading">
                      {formatDate(log.created_at)}
                    </div>
                  </div>
                  {log.notes && (
                    <div className="py-4 ms-2">
                      <p className="font-medium text-heading truncate">Note:</p>
                      <p className="text-sm">{log.notes}</p>
                    </div>
                  )}
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
