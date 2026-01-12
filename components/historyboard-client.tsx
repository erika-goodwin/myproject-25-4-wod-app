"use client";

import { HistoryBlock } from "@/components/history-block";
import { ContentBox } from "@/components/content-block";
import { useUserHistory } from "@/hooks/useUserHistory";
import { HistoryBoardProps } from "@/types/user";


// type HistoryBoardProps = {
//   user: {
//     id: string;
//   } | null;
// };

export default function HistoryBoard({ user }: HistoryBoardProps) {
  const userId = user?.id ?? null;

  const { loading, history } = useUserHistory(userId);

  if (loading) {
    return <p className="text-center py-10">Checking login...</p>;
  }

  return (
    <>
      <ContentBox title="Workout History">
        <HistoryBlock logs={history} userId={userId} dashboard={false} />
      </ContentBox>
    </>
  );
}
