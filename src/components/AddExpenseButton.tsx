"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Plus, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { Poppins, Roboto_Mono, Inter } from "next/font/google";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addTransaction } from "@/lib/features/transaction/transactionSlice";

const poppins = Poppins({ weight: ["400", "600"], subsets: ["latin"] });
const robotoMono = Roboto_Mono({ weight: ["400", "600"], subsets: ["latin"] });
const inter = Inter({ weight: ["400", "500", "600"], subsets: ["latin"] });

// Zod schema for the expense form.
const expenseSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(parseFloat(val)), "Amount must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Amount must be greater than 0"),
  date: z
    .string()
    .min(1, "Date is required")
    .refine((val) => !isNaN(Date.parse(val)), "Please enter a valid date"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(200, "Description must not exceed 200 characters"),
  category: z.string().min(1, "Category is required"),
});

type ExpenseFormValues = z.infer<typeof expenseSchema>;

const AddExpenseDialog = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // We assume your transaction state has a "transaction" field with an _id
  const transactionState = useAppSelector((state) => state.transactionReducer);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
      category: "",
    },
  });

  const onSubmit = async (values: ExpenseFormValues) => {
    try {
      const formattedData = {
        ...values,
        amount: parseFloat(values.amount),
        date: new Date(values.date),
      };
      // Dispatch addTransaction if we have a transaction document
      if (transactionState.transaction) {
        dispatch(
          addTransaction({
            transaction_id: transactionState.transaction._id,
            amount: formattedData.amount,
            date: formattedData.date,
            description: formattedData.description,
          })
        );
      }
      setDialogOpen(false);
      router.push("/expenses");
    } catch (error) {
      console.error("Error submitting expense:", error);
    }
  };

  return (
    <>
      {/* Plus button to open the dialog */}
      <Plus
        className="bg-green-500 hover:bg-green-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white shadow-lg w-16 h-16 fixed bottom-5 right-5 rounded-full transition-all cursor-pointer"
        onClick={() => setDialogOpen(true)}
      />
      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className={`${poppins.className} text-zinc-800 dark:text-zinc-100`}>
              Add Transaction
            </AlertDialogTitle>
            <AlertDialogDescription className={`${inter.className} text-zinc-600 dark:text-zinc-400`}>
              Enter the transaction details below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {/* Form integrated into the dialog */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${inter.className} text-zinc-700 dark:text-zinc-300`}>
                      Amount
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <Input
                          placeholder="0.00"
                          className={`${robotoMono.className} pl-10 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700`}
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${inter.className} text-zinc-700 dark:text-zinc-300`}>
                      Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className={`${robotoMono.className} bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${inter.className} text-zinc-700 dark:text-zinc-300`}>
                      Category
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Food, Transport, Entertainment"
                        className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={`${inter.className} text-zinc-700 dark:text-zinc-300`}>
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter expense details..."
                        className="bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700 min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />

              <AlertDialogFooter>
                <AlertDialogCancel className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-green-500 hover:bg-green-600 text-white"
                  type="submit"
                >
                  Add Expense
                </AlertDialogAction>
              </AlertDialogFooter>
            </form>
          </Form>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AddExpenseDialog;
