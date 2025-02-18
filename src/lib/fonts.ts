import { Geist, Geist_Mono ,Poppins,Roboto_Mono,Bebas_Neue} from "next/font/google";

const geist_sans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geist_mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });
const robotoMono = Roboto_Mono({ weight: ["400", "600"], subsets: ["latin"] });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"] });



export {geist_mono,geist_sans}