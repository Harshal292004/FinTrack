import type { Metadata } from "next";
import { geist_sans,geist_mono } from "@/lib/style";
import Navbar from "@/components/Navbar";
import StoreProvider from "./StoreProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fin Track",
  description: "Manage your finance the smart way",
  icons:[
    '/fintracklogo.png'
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <StoreProvider>
          <body
              className={`${geist_sans.variable} ${geist_mono.variable} antialiased`}
            >
              <SidebarProvider>    
                <Navbar></Navbar>
                {children}
              </SidebarProvider>
            </body>
        </StoreProvider>
    </html>
  );
}
