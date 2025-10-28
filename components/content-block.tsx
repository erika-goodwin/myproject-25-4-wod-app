import { cn } from "@/lib/utils"; // optional helper for merging classNames

interface ContentBoxProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentBox({ title, children, className }: ContentBoxProps) {
  return (
    <>
      <div
        className={cn(
          "w-full max-w-lg p-4 bg-offwhite/10 rounded-lg shadow-sm sm:p-8 ",
          className
        )}
      >
        {title && (
          <h5 className="mb-4 text-xl font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h5>
        )}

        <div>{children}</div>
      </div>
    </>
  );
}
