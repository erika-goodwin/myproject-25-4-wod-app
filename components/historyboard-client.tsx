"use client";

import { HistoryBlock } from "@/components/history-block";
import { ContentBox } from "@/components/content-block";
import { useUserHistory } from "@/hooks/useUserHistory";
import { HistoryBoardProps } from "@/types/user";
import LoadingSpinner from "./loading-spinner";

export default function HistoryBoard({ user }: HistoryBoardProps) {
  const userId = user?.id ?? null;

  const { loading, history } = useUserHistory(userId);

  if (loading) {
    return <LoadingSpinner text="Checking login..." />;
  }

  return (
    <>
      <ContentBox title="Workout History">
        <HistoryBlock logs={history} userId={userId} dashboard={false} />
      </ContentBox>
    </>
  );
}
