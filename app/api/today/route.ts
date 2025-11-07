import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

// For today's WOD
export async function GET() {
  const wod = {
    id: randomUUID(),
    // id: "wod-" + new Date().toISOString().split("T")[0],
    name: "21-15-9",
    exercises: ["Thrusters (95/65 lb)", "Pull-ups"],
    date: new Date().toISOString().split("T")[0],
  };

  return NextResponse.json(wod);
}
