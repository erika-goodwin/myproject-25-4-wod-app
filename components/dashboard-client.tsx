"use client";
import WodBlock from "@/components/wod-block";
import { HistoryBlock } from "@/components/history-block";
import { ContentBox } from "@/components/content-block";
import { useUserHistory } from "@/hooks/useUserHistory";
import { DashboardClientProps } from "@/types/user";
import LoadingSpinner from "./loading-spinner";

export default function DashboardClient({ user }: DashboardClientProps) {
  // BUG 🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝🐝
  // When you read the page for the first time, evern with the record, it thinks you don't have the record and you can add the same item more than twise

  const userId = user?.id ?? null;

  const { loading, history, refreshHistory } = useUserHistory(userId);

  if (loading) {
    return <LoadingSpinner text="Checking login..." />;
  }

  return (
    <>
      <ContentBox title="Today's WOD">
        <WodBlock userId={userId} onLogged={() => refreshHistory()} />
      </ContentBox>
      <ContentBox title="Workout History">
        <HistoryBlock logs={history} userId={userId} dashboard={true} />
      </ContentBox>
    </>
  );
}
