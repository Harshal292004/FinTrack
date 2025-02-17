"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  useSidebar,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Categories",
    url: "#",
    icon: ChartColumnStacked,
  },
  {
    title: "Expenses",
    url: "#",
    icon: HandCoins,
  }
];

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { theme, setTheme } = useTheme();
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  return (
    <div className="relative">
      {/* Top Navbar */}
      <motion.nav 
        className={`fixed top-0 w-full h-16 flex items-center justify-between px-4 bg-background `}
      >
        <div className="flex items-center gap-4">
          
          <motion.div 
            className={`flex items-center gap-2 ${open ? 'hidden' : ''} transition-all duration-300`}
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
            <h1 className={`${inter.className} text-xl font-bold`}>
              FinTrack
            </h1>
          </motion.div>
        </div>

        <div className="flex items-center gap-4">
        <Button
            variant="ghost"
            size="icon"
            className=""
            onClick={() => setOpen(!open)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          

          {!isLoggedIn ? (
            <>
              <Button 
                variant="ghost"
                className="hover:bg-primary/10"
                onClick={() => setIsLoggedIn(true)}
              >
                Login
              </Button>
              <Button 
                variant="default"
                className="hover:bg-primary/90"
              >
                Sign Up
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="rounded-full hover:bg-primary/10"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
                <span className="font-medium">John Doe</span>
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
            className="fixed left-0 top-0 h-full rounded-r-sm w-[250px] z-40"
          >
            <Sidebar className="border-r h-full  rounded-r-xl bg-black">
              <SidebarHeader className="p-4">
                <div className="flex items-center gap-2">
                  <Image
                    alt="fin track logo"
                    src="/fintracklogo.png"
                    width={24}
                    height={24}
                  />
                  <p className={`${inter.className} font-semibold`}>FinTrack</p>
                </div>
              </SidebarHeader>
              
              <SidebarContent className="px-2">
                <SidebarGroup>
                  <SidebarGroupLabel className="text-sm font-medium text-muted-foreground px-2 py-1">
                    Navigation
                  </SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton
                            asChild
                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/10 transition-colors"
                          >
                            <a href={item.url}>
                              <item.icon className="h-5 w-5" />
                              <span>{item.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>

              <SidebarFooter className="p-4">
                <Button 
                  variant="destructive"
                  className="w-full flex items-center gap-2 rounded-lg"
                  onClick={() => setIsLoggedIn(false)}
                >
                  <LogOut className="h-5 w-5" />
                  Logout
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