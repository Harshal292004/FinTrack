"use client";
import { useEffect, useState } from "react";
import { Poppins, Roboto_Mono, Inter } from "next/font/google";
import { DollarSign} from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Card, CardContent} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useAppDispatch,useAppSelector } from '@/lib/hooks';
import { addTransaction, setError } from "@/lib/features/transaction/transactionSlice";

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

// Form validation schema
const expenseSchema = z.object({
  amount: z.string()
    .min(1, "Amount is required")
    .refine((val) => !isNaN(parseFloat(val)), "Amount must be a valid number")
    .refine((val) => parseFloat(val) > 0, "Amount must be greater than 0"),
  date: z.string()
    .min(1, "Date is required")
    .refine((val) => !isNaN(Date.parse(val)), "Please enter a valid date"),
  description: z.string()
    .min(5, "Description must be at least 5 characters")
    .max(200, "Description must not exceed 200 characters"),
  category: z.string()
    .min(1, "Category is required"),
});

const AddExpensePage = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      amount: "",
      date: new Date().toISOString().split('T')[0],
      description: "",
      category: "",
    },
  });
  const dispatch= useAppDispatch()
  const transaction=useAppSelector(state=>state.transactionReducer)
  const [localError, setLocalError] = useState("");
  const [loading,setLoading]= useState(false);
  useEffect(
    ()=>{
        if(transaction.loading){
            setLoading(transaction.loading)
        }
        if(transaction.error){
            setLocalError(transaction.error)
        }
    }
  )
  const onSubmit = async (values:any) => {
    try {
        const formattedData = {
            ...values,
            amount: parseFloat(values.amount),
            date: new Date(values.date)
          };
          if(transaction.transaction){

            dispatch(addTransaction({
              transaction_id: transaction.transaction._id ,
              amount: formattedData.amount,
              date: formattedData.date,
              description: formattedData.description
            }));
                
          }
      router.push('/expenses');
    } catch (error) {
      console.error("Error submitting expense:", error);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className={`${poppins.className} mb-6`}>
        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">
          Add New Expense
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Enter the details of your new expense
        </p>
      </div>

      <Card className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <div className="relative">
                        <Input
                          type="date"
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

              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  onClick={() => router.push('/expenses')}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 dark:bg-orange-500 dark:hover:bg-orange-600 text-white"
                >
                  Add Expense
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddExpensePage;