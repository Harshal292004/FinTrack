"use client";
import React, { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { bebas_neue, poppins, inter } from "@/lib/fonts";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  LogOut,
  Menu,
  Home,
  Sun,
  Moon,
  HandCoins,
  ChartColumnStacked,
  LayoutDashboard,
  User as UserIcon,
  Search,
  Mic,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  registerUser,
  loginUser,
  setLogout,
} from "@/lib/features/user/userSlice";
import { z } from "zod";

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

const nameSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

interface NavbarProps {
  bodyRef: React.RefObject<HTMLBodyElement | null>;
}

const Navbar = ({ bodyRef }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.userReducer);
  const isLoggedIn = Boolean(userState.user);

  const { open, setOpen, openMobile, setOpenMobile } = useSidebar();

  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.classList.toggle("dark");
      setIsDark((prev) => !prev);
    }
  }, [bodyRef]);

  const [name, setName] = useState("");
  const [localError, setLocalError] = useState("");
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Register");

  const pathname = usePathname();
  const selectedPath = (url: string) => url === pathname;

  useEffect(() => {
    if (userState.error) {
      setLocalError(userState.error);
    }
  }, [userState.error]);

  const handleRegisterLogin = (action: "Register" | "Login") => {
    setDialogTitle(action);
    setLocalError("");
    setName("");
    setRegisterDialogOpen(true);
  };

  const handleSubmit = () => {
    const result = nameSchema.safeParse({ name });
    if (!result.success) {
      setLocalError(result.error.errors[0].message);
      return;
    }
    setLocalError("");

    if (dialogTitle === "Register") {
      dispatch(registerUser({ name }));
    } else {
      dispatch(loginUser({ name }));
    }
    setRegisterDialogOpen(false);
  };

  const handleLogout = () => {
    dispatch(setLogout());
  };

  return (
    <div className="relative">
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full h-16 md:h-20 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md"
      >
        <div className="h-full px-4 sm:px-6 flex items-center justify-between">
          <motion.div
            className={`flex items-center gap-3 ${
              open ? "opacity-0" : "opacity-100"
            }`}
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
            <h1
              className={`${bebas_neue.className} text-xl md:text-2xl tracking-wide text-green-600 dark:text-orange-500`}
            >
              Fin Track
            </h1>
          </motion.div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              {isDark ? (
                <Sun className="h-5 w-5 text-orange-500" />
              ) : (
                <Moon className="h-5 w-5 text-green-600" />
              )}
            </Button>

            <div className="hidden md:flex items-center gap-2">
              {!isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => handleRegisterLogin("Login")}
                    className={`${poppins.className} text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800`}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => handleRegisterLogin("Register")}
                    className={`${poppins.className} text-sm bg-green-500 hover:bg-green-600 dark:bg-orange-500 dark:hover:bg-orange-600`}
                  >
                    Register
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-orange-900/20 flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-green-600 dark:text-orange-500" />
                  </div>
                  <span className={`${poppins.className} text-sm font-medium`}>
                    {userState.user?.name}
                  </span>
                </div>
              )}
            </div>

            {/* Hamburger menu always visible */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-zinc-950/20 dark:bg-zinc-950/40 backdrop-blur-sm z-40"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed left-0 top-0 h-full w-[280px] z-50"
            >
              <Sidebar className="h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
                <SidebarHeader className="p-4">
                  <div className="flex items-center gap-3 mb-6">
                    <Image
                      alt="fin track logo"
                      src="/fintracklogo.png"
                      width={32}
                      height={32}
                      className="transition-transform duration-300 hover:scale-110"
                    />
                    <h1
                      className={`${bebas_neue.className} text-2xl tracking-wide text-green-600 dark:text-orange-500`}
                    >
                      Fin Track
                    </h1>
                  </div>
                  <div className="relative">
                    <Input
                      placeholder="Search..."
                      className="pl-9 bg-zinc-50 dark:bg-zinc-800/50"
                    />
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-700 h-7 w-7"
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  </div>
                </SidebarHeader>

                <SidebarContent className="px-2">
                  <div className="space-y-1">
                    {items.map((item, index) => (
                      <Link
                        href={item.url}
                        key={index}
                        onClick={() => setOpen(false)}
                      >
                        <motion.div
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`
                            flex items-center gap-3 px-3 py-2 rounded-lg
                            transition-all duration-200
                            ${
                              selectedPath(item.url)
                                ? "bg-green-100 dark:bg-orange-500/20 text-green-700 dark:text-orange-500"
                                : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                            }
                          `}
                        >
                          <item.icon
                            className={`h-5 w-5 ${
                              selectedPath(item.url)
                                ? "text-green-600 dark:text-orange-500"
                                : "text-zinc-500 dark:text-zinc-400"
                            }`}
                          />
                          <span
                            className={`${poppins.className} ${
                              selectedPath(item.url) ? "font-medium" : ""
                            }`}
                          >
                            {item.title}
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </SidebarContent>

                {isLoggedIn && (
                  <SidebarFooter className="p-4 border-t border-zinc-200 dark:border-zinc-800">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      onClick={handleLogout}
                    >
                      <LogOut className="mr-2 h-5 w-5" />
                      Logout
                    </Button>
                  </SidebarFooter>
                )}
              </Sidebar>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Dialog */}
      <AlertDialog
        open={registerDialogOpen}
        onOpenChange={setRegisterDialogOpen}
      >
        <AlertDialogContent className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle
              className={`${poppins.className} text-2xl font-semibold`}
            >
              {dialogTitle}
            </AlertDialogTitle>
            <AlertDialogDescription
              className={`${inter.className} text-zinc-600 dark:text-zinc-400`}
            >
              {dialogTitle === "Register"
                ? "Create your account to get started."
                : "Welcome back! Please enter your name to continue."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4">
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-2"
            />
            {localError && (
              <p className="text-sm text-red-500 mt-1">{localError}</p>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-500 hover:bg-green-600 dark:bg-orange-500 dark:hover:bg-orange-600"
              onClick={handleSubmit}
            >
              {userState.loading ? "Loading..." : dialogTitle}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Navbar;
