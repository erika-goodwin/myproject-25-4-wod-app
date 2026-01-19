import Link from "next/link";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import { ReactNode } from "react";

export default async function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center gap-10">
      {/* NAV */}
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16 sticky top-0  bg-charcoal opacity-95 backdrop-blur z-50 shadow-sm">
        <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center p-3 px-5 text-sm">
          <div className="w-full flex gap-5 item-start md:items-center font-semibold">
            <Link href="/">WOD Tracker</Link>
            <Link href="/history">History</Link>
          </div>
          {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
          {/* {!hasEnvVars ? <EnvVarWarning /> : <AuthButton user={user} />} */}
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <main className="flex-1 w-full flex flex-col gap-5 items-center px-6">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="w-full flex items-center justify-center border-t text-xs gap-8 py-16">
        <p>2025 Daily WOD Tracker</p>
        {/* <ThemeSwitcher /> */}
      </footer>
    </div>
  );
}
