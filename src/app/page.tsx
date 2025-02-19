"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { roboto_mono, bebas_neue, poppins, inter } from "@/lib/fonts";
import { ChevronRight, BarChart3, FolderKanban, Wallet, Github } from "lucide-react";

const HomePage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: BarChart3,
      title: "Dashboard Analytics",
      description: "Get comprehensive insights into your financial data with interactive charts and metrics."
    },
    {
      icon: FolderKanban,
      title: "Smart Categories",
      description: "Organize and track expenses with intelligent categorization and custom labels."
    },
    {
      icon: Wallet,
      title: "Expense Tracking",
      description: "Log and monitor your expenses with our intuitive, validated forms and real-time updates."
    }
  ];

  const techStack = [
    { name: "Next.js", description: "Server-side rendering" },
    { name: "React.js", description: "Dynamic UI components" },
    { name: "Tailwind CSS", description: "Utility-first styling" },
    { name: "Framer Motion", description: "Smooth animations" },
    { name: "shadcn/ui", description: "Pre-built components" },
    { name: "Recharts", description: "Beautiful graphs" },
    { name: "Redux", description: "State management" }
  ];

  return (
    <div className="w-full min-h-screen mt-16 bg-zinc-50 dark:bg-zinc-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <motion.div 
          className="container mx-auto px-4 py-20 md:py-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              className={`${bebas_neue.className} text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-600 dark:from-orange-500 dark:to-amber-500 mb-6`}
              {...fadeIn}
            >
              Master Your Finances
            </motion.h1>
            <motion.p 
              className={`${poppins.className} text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8`}
              {...fadeIn}
              transition={{ delay: 0.2 }}
            >
              Track, analyze, and optimize your spending with our powerful financial management platform.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              {...fadeIn}
              transition={{ delay: 0.4 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-zinc-200 dark:border-zinc-800"
              >
                <Github className="mr-2 h-4 w-4" />
                View on GitHub
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-zinc-800/50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <feature.icon className="h-8 w-8 text-green-500 dark:text-orange-500 mb-4" />
                <h3 className={`${poppins.className} text-xl font-semibold mb-2`}>
                  {feature.title}
                </h3>
                <p className={`${inter.className} text-zinc-600 dark:text-zinc-400`}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`${bebas_neue.className} text-3xl md:text-4xl font-bold text-center mb-12`}>
              Built with Modern Tech
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {techStack.map((tech, index) => (
                <motion.div
                  key={index}
                  className="p-4 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className={`${poppins.className} font-semibold mb-1`}>
                    {tech.name}
                  </h3>
                  <p className={`${inter.className} text-sm text-zinc-600 dark:text-zinc-400`}>
                    {tech.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;