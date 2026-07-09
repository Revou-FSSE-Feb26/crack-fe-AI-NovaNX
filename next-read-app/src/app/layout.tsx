import type { Metadata } from "next";

import "./globals.css";
import type { RootLayoutProps } from "@/types/layout";

export const metadata: Metadata = {
  title: {
    default: "NexRead",
    template: "%s | NexRead",
  },
  description: "Discover, reserve, and manage books with NexRead.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
