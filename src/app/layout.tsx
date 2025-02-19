// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import ClientBody from "./ClientBody";

export const metadata: Metadata = {
  title: "Fin Track",
  description: "Manage your finance the smart way",
  icons: ["/fintracklogo.png"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
