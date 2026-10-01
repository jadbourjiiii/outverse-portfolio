import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "Outverse — We build & teach the web",
  description:
    "Outverse is a software studio, an academy and a launchpad — one ecosystem for turning ideas into working products.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}