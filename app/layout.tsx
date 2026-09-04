import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MineSafe | Safety starts here",
  description: "MineSafe gives mining teams the clarity and tools to make safer decisions, every shift.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
