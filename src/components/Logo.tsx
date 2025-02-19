import Image from "next/image";
import { bebas_neue } from "@/lib/fonts";
const Logo = () => (
  <div className="flex items-center gap-3">
    <Image
      alt="fin track logo"
      src="/fintracklogo.png"
      width={32}
      height={32}
      className="transition-transform duration-300 hover:scale-110"
    />
    <h1
      className={`${bebas_neue.className} text-xl md:text-2xl tracking-wide text-green-600 dark:text-orange-500`}
    >
      Fin Track
    </h1>
  </div>
);

export { Logo };
