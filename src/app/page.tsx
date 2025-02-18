"use client";
import React from "react";
import Link from "next/link";
import { Button } from "../components/ui/button";

const HomePage = () => {
  return (
    <div className="w-full h-full mt-16">
      {/* Banner Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 dark:from-orange-500 dark:to-zinc-900 py-16">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold font-poppins text-white">
            Welcome to Fin Track
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white">
            Your all-in-one financial tracking solution.
          </p>
        </div>
      </section>
       {/* How to Use Section */}
       <section className="bg-zinc-100 dark:bg-zinc-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-poppins mb-6">How to Use Fin Track</h2>
          <ol className="list-decimal ml-6 space-y-4 text-lg font-inter">
            <li>
              <strong>Dashboard:</strong> Get an overview of your financial data, including recent transactions and monthly expense charts.
            </li>
            <li>
              <strong>Expenses:</strong> Add, edit, or delete your expenses with our intuitive, validated forms.
            </li>
            <li>
              <strong>Reports:</strong> Visualize your spending habits through detailed charts and breakdowns.
            </li>
            <li>
              <strong>Settings:</strong> Customize your experience by managing themes and personal preferences.
            </li>
          </ol>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold font-poppins mb-6">Tech Stack</h2>
          <p className="text-lg font-inter mb-4">
            Fin Track is built with modern technologies to ensure a seamless and efficient experience:
          </p>
          <ul className="list-disc ml-6 text-lg font-inter space-y-2">
            <li>
              <strong>Next.js</strong> – Server-side rendering and routing.
            </li>
            <li>
              <strong>React</strong> – Building dynamic user interfaces.
            </li>
            <li>
              <strong>Tailwind CSS</strong> – Utility-first styling and responsive design.
            </li>
            <li>
              <strong>Framer Motion</strong> – Smooth animations and transitions.
            </li>
            <li>
              <strong>shadcn/ui</strong> – Pre-built, customizable UI components.
            </li>
          </ul>
        </div>
      </section>

     
    </div>
  );
};

export default HomePage;
