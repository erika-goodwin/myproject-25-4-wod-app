import type { Metadata } from "next";
import { Geist, Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Optional: for use with Tailwind CSS
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins", // Optional: for use with Tailwind CSS
  weight: ["400", "700"], // Specify weights if not a variable font
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.className} ${inter.variable} ${poppins.variable} antialiased bg-charcoal text-offwhite`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
