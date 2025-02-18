import { Geist, Geist_Mono } from "next/font/google";

const geist_sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geist_mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export {geist_mono,geist_sans}