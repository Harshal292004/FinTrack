"use client";
// React imports
import { useCallback, useState } from "react";

// Font imports
import { poppins, inter } from "@/lib/fonts";

// ANimation imports
import { motion, AnimatePresence } from "framer-motion";

// Next imports
import { usePathname } from "next/navigation";
import Link from "next/link";

// Icon imports
import {
  LogOut,
  Menu,
  Sun,
  Moon,
  User as UserIcon,
  Search,
  Mic,
  X,
  Loader2
} from "lucide-react";

// Component imports
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { LoadingSpinner } from "./LoadingSpinner";
import { ErrorMessage } from "./ErrorMessage";

// Redux hooks for state management
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Redux thunks for async calling
import {
  registerUser,
  loginUser,
  setLogout,
} from "@/lib/features/user/userSlice";

// Zod for input validation
import { z } from "zod";

// Zod Schema
const nameSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

// Constants import for navigation
import { NAVIGATION_ITEMS } from "@/lib/constants";

// Navbar input interface
import { INavbarProps } from "../../types";

import { Logo } from "./Logo";

const Navbar = ({ bodyRef }: INavbarProps) => {
  // Dispatch for login and registration
  const dispatch = useAppDispatch();

  // User State
  const userState = useAppSelector((state) => state.userReducer);
  const isLoggedIn = Boolean(userState.user);
  const pathname = usePathname();

  // State
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [name, setName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"Register" | "Login">("Register");

  // Handle Dark Mode Toggle
  const toggleDarkMode = useCallback(() => {
    if (bodyRef.current) {
      bodyRef.current.classList.toggle("dark");
      setIsDark((prev) => !prev);
    }
  }, [bodyRef]);

  // Handle Auth Action
  const handleAuthAction = (mode: "Register" | "Login") => {
    setAuthMode(mode);
    setAuthError("");
    setName("");
    setAuthDialogOpen(true);
  };

  // Handle Auth Submit
  const handleAuthSubmit = () => {
    const result = nameSchema.safeParse({ name });
    if (!result.success) {
      setAuthError(result.error.errors[0].message);
      return;
    }

    if (authMode === "Register") {
      dispatch(registerUser({ name }));
    } else {
      dispatch(loginUser({ name }));
    }
    setAuthDialogOpen(false);
  };

  // Navigation Items
  const NavigationItems = () => (
    <div className="space-y-1">
      {NAVIGATION_ITEMS.map((item, index) => (
        <Link href={item.url} key={index} onClick={() => setSidebarOpen(false)}>
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200
              ${
                pathname === item.url
                  ? "bg-green-100 dark:bg-orange-500/20 text-green-700 dark:text-orange-500"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              }
            `}
          >
            <item.icon
              className={
                pathname === item.url
                  ? "h-5 w-5 text-green-600 dark:text-orange-500"
                  : "h-5 w-5 text-zinc-500 dark:text-zinc-400"
              }
            />
            <span
              className={`${poppins.className} ${
                pathname === item.url ? "font-medium" : ""
              }`}
            >
              {item.title}
            </span>
          </motion.div>
        </Link>
      ))}
    </div>
  );

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
              sidebarOpen ? "opacity-0" : "opacity-100"
            }`}
            animate={{ x: sidebarOpen ? -250 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Logo />
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

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-2">
              {!isLoggedIn ? (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => handleAuthAction("Login")}
                    className={`${poppins.className} text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800`}
                    disabled={userState.loading}
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => handleAuthAction("Register")}
                    className={`${poppins.className} text-sm bg-green-500 hover:bg-green-600 dark:bg-orange-500 dark:hover:bg-orange-600`}
                    disabled={userState.loading}
                  >
                    {userState.loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Register"
                    )}
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

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Global Error Alert */}
      <AnimatePresence>
        {userState.error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-4 z-50"
          >
            <ErrorMessage message={userState.error}></ErrorMessage>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-zinc-950/20 dark:bg-zinc-950/40 backdrop-blur-sm z-40"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed left-0 top-0 h-full w-[280px] z-50"
            >
              <div className="h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-6">
                    <Logo />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSidebarOpen(false)}
                      className="hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <X className="h-5 w-5" />
                    </Button>
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
                </div>

                <div className="px-2">
                  <NavigationItems />
                </div>

                {/* Sidebar Footer */}
                <div className="absolute bottom-0 left-0 right-0 p-4 ">
                  
                  {isLoggedIn ? (
                       <motion.button
                       disabled={userState.loading}
                       onClick={() => dispatch(setLogout())}
                       initial={{ x: -20, opacity: 0 }}
                       animate={{ x: 0, opacity: 1 }}
                       transition={{ delay: 0.1 }}
                       className={`
                         w-full
                         flex justify-center items-center gap-2 
                         px-4 py-2 
                         rounded-lg
                         transition-all duration-200
                         ${userState.loading 
                           ? 'opacity-70 cursor-not-allowed' 
                           : 'hover:bg-red-100 dark:hover:bg-red-500/20'
                         }
                         bg-white dark:bg-zinc-800
                         text-red-600 dark:text-red-400
                         ${poppins.className}
                       `}
                     >
                       {userState.loading ? (
                         <Loader2 className="h-5 w-5 animate-spin" />
                       ) : (
                         <LogOut className="h-5 w-5" />
                       )}
                       <span>{userState.loading ? "Logging out..." : "Logout"}</span>
                     </motion.button>
                  ) : (
                    <div className="flex flex-col gap-2 md:hidden">
                      <Button
                        variant="ghost"
                        onClick={() => handleAuthAction("Login")}
                        className="w-full"
                        disabled={userState.loading}
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => handleAuthAction("Register")}
                        className="w-full bg-green-500 hover:bg-green-600 dark:bg-orange-500 dark:hover:bg-orange-600"
                        disabled={userState.loading}
                      >
                        {userState.loading ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          "Register"
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Auth Dialog */}
      <AlertDialog  open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle
              className={`${poppins.className} text-2xl font-semibold`}
            >
              {authMode}
            </AlertDialogTitle>
            <AlertDialogDescription
              className={`${inter.className} text-zinc-600 dark:text-zinc-400`}
            >
              {authMode === "Register"
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
              disabled={userState.loading}
            />
            {authError && <ErrorMessage message={authError} />}
            {userState.error && <ErrorMessage message={userState.error} />}
            {userState.loading && (
              <div className="mt-4">
                <LoadingSpinner />
                <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center mt-2">
                  {authMode === "Register"
                    ? "Creating your account..."
                    : "Logging you in..."}
                </p>
              </div>
            )}
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel
              className="bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              disabled={userState.loading}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-green-500 hover:bg-green-600 dark:bg-orange-500 dark:hover:bg-orange-600 min-w-[100px]"
              onClick={handleAuthSubmit}
              disabled={userState.loading}
            >
              {userState.loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                authMode
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Navbar;
