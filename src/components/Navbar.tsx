"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Inter, Poppins, Roboto_Mono } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { Bebas_Neue } from "next/font/google";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  LogOut,
  Menu,
  Home,
  Sun,
  Moon,
  HandCoins,
  ChartColumnStacked,
  LayoutDashboard,
  User,
  Search,
  Mic
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ 
  weight: ['400', '600'],
  subsets: ['latin']
});
const robotoMono = Roboto_Mono({ 
  weight: ['400', '600'],
  subsets: ['latin']
});
const bebas_neue = Bebas_Neue({
  weight: '400',
  subsets: ['latin']
});

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    url: "/categories",
    icon: ChartColumnStacked,
  },
  {
    title: "Expenses",
    url: "/expenses",
    icon: HandCoins,
  },
];

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const pathname = usePathname();

  const selectedPath = (url: string) => url === pathname;

  return (
    <div className="relative">
      {/* Top Navbar */}
      <motion.nav
        className="fixed top-0 w-full h-16 flex items-center justify-between px-4 bg-background border-b border-zinc-200 dark:border-zinc-800"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className={`flex items-center gap-2 ${
              open ? "hidden" : ""
            } transition-all duration-300`}
            animate={{ x: open ? -250 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              alt="fin track logo"
              src="/fintracklogo.png"
              width={32}
              height={32}
              className="transition-transform duration-300 hover:scale-110"
            />
            <h1 className={`${poppins.className} text-xl font-bold`}>FinTrack</h1>
          </motion.div>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(!open)}
            className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <Menu className="h-6 w-6" />
          </Button>

          {!isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
                onClick={() => setIsLoggedIn(true)}
              >
                Login
              </Button>
              <Button 
                className="bg-green-500 hover:bg-green-600 dark:bg-orange-500 dark:hover:bg-orange-600"
              >
                Register
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-orange-900/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600 dark:text-orange-500" />
                </div>
                <span className={`${poppins.className} font-medium`}>John Doe</span>
              </div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* Sidebar */}
      <AnimatePresence>
        {(open || openMobile) && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="fixed left-0 top-0 h-full w-[250px] z-40"
          >
            <Sidebar className="p-4 border-r h-full bg-white dark:bg-zinc-900">
              {/* Header Section */}
              <SidebarHeader className="p-4 bg-white dark:bg-zinc-900">
                <div className="flex items-center gap-4 mb-6">
                  <Image
                    alt="fin track logo"
                    src="/fintracklogo.png"
                    width={32}
                    height={32}
                    className="transition-transform duration-300 hover:scale-110"
                  />
                  <h1 className={`${bebas_neue.className} tracking-widest text-xl font-bold text-green-600 dark:text-orange-500`}>
                    Fin Track
                  </h1>
                </div>

                {/* Search Section */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="relative flex-1">
                    <Input
                      placeholder="Search..."
                      className="pl-8 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700"
                    />
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
              </SidebarHeader>

              {/* Navigation Section */}
              <SidebarContent className="px-2 mb-6 bg-white dark:bg-zinc-900">
                <div className="space-y-1">
                  {items.map((item, index) => (
                    <Link href={item.url} key={index}>
                      <div
                        className={`
                          flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer
                          transition-all duration-200
                          ${selectedPath(item.url)
                            ? 'bg-green-100 dark:bg-orange-500/20 text-green-700 dark:text-orange-500'
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50'
                          }
                        `}
                      >
                        <item.icon className={`h-5 w-5 ${
                          selectedPath(item.url)
                            ? 'text-green-600 dark:text-orange-500'
                            : 'text-zinc-500 dark:text-zinc-400'
                        }`} />
                        <span className={`${robotoMono.className} ${
                          selectedPath(item.url) ? 'font-semibold' : 'font-normal'
                        }`}>
                          {item.title}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </SidebarContent>

              {/* Footer Section */}
              <SidebarFooter className="p-4 bg-white dark:bg-zinc-900">
                <Button
                  variant="ghost"
                  className="w-full flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => setIsLoggedIn(false)}
                >
                  <LogOut className="h-5 w-5" />
                  <span className={`${poppins.className}`}>Logout</span>
                </Button>
              </SidebarFooter>
            </Sidebar>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;