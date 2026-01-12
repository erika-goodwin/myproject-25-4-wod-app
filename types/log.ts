import { Wod } from "./wod";

export type Log = {
  id: string;
  user_id: string;
  wod_id: string;
  completed: boolean;
  created_at: string;
  note: string;
  wod: Wod;
  notes: string;
};
