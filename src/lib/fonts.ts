import {
  Geist,
  Geist_Mono,
  Poppins,
  Roboto_Mono,
  Bebas_Neue,
  Inter,
} from "next/font/google";

const geist_sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geist_mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const roboto_mono = Roboto_Mono({
  weight: ["400", "600"],
  subsets: ["latin"],
});

const bebas_neue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
});

export { geist_mono, geist_sans, inter, poppins, roboto_mono, bebas_neue };
