// src/app/ClientBody.tsx
"use client";
import StoreProvider from "./StoreProvider";
import { useRef } from "react";
import { geist_sans, geist_mono } from "@/lib/fonts";
import Navbar from "@/components/Navbar";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const bodyRef = useRef<HTMLBodyElement | null>(null);

  return (
    <StoreProvider>
        <body
          ref={bodyRef}
          className={`${geist_sans.variable} ${geist_mono.variable}`}
        >
          {/* Pass bodyRef to Navbar */}
          <Navbar bodyRef={bodyRef} />
          {children}
        </body>
    </StoreProvider>
  );
}
