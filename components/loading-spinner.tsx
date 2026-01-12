"use client";

export default function LoadingSpinner({
  text = "Loading...",
}: {
  text?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900" />
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
}
