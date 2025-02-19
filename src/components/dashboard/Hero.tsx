"use client";
import React from 'react';
import { Poppins, Roboto_Mono, Inter } from "next/font/google";
import { RecentTransactions } from './RecentTransactions';
import { MonthlExpenseChart } from './MonthlyExpenseChart';
import { Button } from '../ui/button';
import AddExpenseButton from '../AddExpenseDialog';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, TrendingUp, Plus } from 'lucide-react';

const poppins = Poppins({ 
  weight: ['400', '600'],
  subsets: ['latin']
});

const robotoMono = Roboto_Mono({ 
  weight: ['400', '600'],
  subsets: ['latin']
});

const inter = Inter({ 
  weight: ['400', '500', '600'],
  subsets: ['latin']
});

const Hero = () => {
  return (
    <div className="w-full min-h-screen p-6 mt-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Today's Expenses Card */}
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <CardHeader className="pb-2">
              <CardTitle className={`${poppins.className} text-lg text-zinc-800 dark:text-zinc-100`}>
                Today's Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-500 dark:text-orange-500" />
                <span className={`${robotoMono.className} text-3xl font-semibold text-zinc-800 dark:text-zinc-100`}>
                  $300.00
                </span>
              </div>
              <p className={`${inter.className} mt-2 text-sm text-zinc-500 dark:text-zinc-400`}>
                Total spending for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
              </p>
            </CardContent>
          </Card>

          {/* AI Assistant Card */}
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <CardHeader className="pb-2">
              <CardTitle className={`${poppins.className} text-lg text-zinc-800 dark:text-zinc-100`}>
                What Fin has to say?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`${inter.className} mb-4 text-sm text-zinc-600 dark:text-zinc-400`}>
                Get AI-powered insights about your spending habits
              </p>
              <Button 
                className="bg-green-500 hover:bg-green-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white"
              >
                <Brain className="mr-2 h-4 w-4" />
                Ask Fin
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Chart - Full Width */}
        <div className="w-full">
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <CardHeader>
              <CardTitle className={`${poppins.className} text-xl text-zinc-800 dark:text-zinc-100`}>
                Monthly Expenses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlExpenseChart />
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions - Full Width */}
        <div className="w-full">
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <CardHeader>
              <CardTitle className={`${poppins.className} text-xl text-zinc-800 dark:text-zinc-100`}>
                Recent Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RecentTransactions />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Action Button */}
        <AddExpenseButton >
        </AddExpenseButton>
    </div>
  );
};

export default Hero;
