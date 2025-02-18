"use client";
import React, { useState } from 'react';
import { Poppins, Roboto_Mono, Inter } from "next/font/google";
import { Edit2, Trash2, DollarSign, Calendar, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
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

const ExpensesPage = () => {
  const [transactions, setTransactions] = useState([
    {
        amount: 50.75,
        date: "2025-02-01",
        description: "Grocery shopping at Walmart, including vegetables, dairy, and snacks."
    },
    {
        amount: 120.00,
        date: "2025-02-05",
        description: "Annual subscription for an online coding course on Udemy."
    },
    {
        amount: 35.49,
        date: "2025-02-08",
        description: "Dinner at an Italian restaurant, including pasta and drinks."
    },
    {
        amount: 200.00,
        date: "2025-02-12",
        description: "Freelance web development payment received from a client."
    },
    {
        amount: 15.00,
        date: "2025-02-14",
        description: "Coffee and snacks at Starbucks during a casual meetup."
    },
    {
        amount: 89.99,
        date: "2025-02-16",
        description: "Purchase of wireless noise-canceling headphones from Amazon."
    },
    {
        amount: 25.30,
        date: "2025-02-18",
        description: "Movie night with friends, including tickets and popcorn."
    },
  ]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState<number|null>(null);

  const handleDelete = (index:number) => {
    setSelectedTransactionIndex(index);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedTransactionIndex !== null) {
      const newTransactions = transactions.filter((_, index) => index !== selectedTransactionIndex);
      setTransactions(newTransactions);
      setDeleteDialogOpen(false);
      setSelectedTransactionIndex(null);
    }
  };

  const handleEdit = (index:number) => {
    // Implement edit functionality
    console.log("Edit transaction at index:", index);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <div className={`${poppins.className} mb-6`}>
        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
          Expenses
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Track and manage your financial transactions
        </p>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <Card 
            key={index}
            className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className={`h-5 w-5 ${transaction.amount >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`} />
                    <span className={`${robotoMono.className} text-lg font-semibold ${transaction.amount >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                      ${Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                  <p className={`${inter.className} text-sm text-zinc-700 dark:text-zinc-300 mb-2`}>
                    {transaction.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-zinc-400" />
                    <span className={`${robotoMono.className} text-xs text-zinc-500 dark:text-zinc-400`}>
                      {new Date(transaction.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-600 hover:text-green-600 dark:text-zinc-400 dark:hover:text-orange-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => handleEdit(index)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-zinc-600 hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={() => handleDelete(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className={`${poppins.className} text-zinc-800 dark:text-zinc-100`}>
              Delete Transaction
            </AlertDialogTitle>
            <AlertDialogDescription className={`${inter.className} text-zinc-600 dark:text-zinc-400`}>
              Are you sure you want to delete this transaction? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={confirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExpensesPage;