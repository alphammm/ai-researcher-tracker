import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Researcher Startup Tracker",
  description:
    "Track top AI researchers leaving big labs to start companies. Updated weekly.",
  openGraph: {
    title: "AI Researcher Startup Tracker",
    description:
      "Track top AI researchers leaving big labs to start companies. Updated weekly.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
