"use client";

// React imports
import { useState } from "react";
import { useForm } from "react-hook-form";

// Next imports
import { useRouter } from "next/navigation";

// Icon imports
import { Plus, DollarSign } from "lucide-react";

// UI imports
import { Button } from "./ui/button";
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

// Redux hooks for State Management
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

// Redux thunks for async calling
import { addTransaction } from "@/lib/features/transaction/transactionSlice";

// Font imports
import { poppins, roboto_mono, inter } from "@/lib/fonts";

// Zod form validation
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  // Routing
  const router = useRouter();

  // Dispatch for add transaction thunk
  const dispatch = useAppDispatch();

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

  // Handler for managing on submission of the form
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
      <button
        onClick={() => setDialogOpen(true)}
        className="
        fixed bottom-6 right-6
        p-3 sm:p-4
        rounded-full
        bg-green-500 hover:bg-green-600
        dark:bg-orange-500 dark:hover:bg-orange-600
        text-white
        shadow-lg hover:shadow-xl
        transform hover:scale-105
        transition-all duration-200
        cursor-pointer
        flex items-center justify-center
      "
      >
        <Plus className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
      </button>

      <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle
              className={`${poppins.className} text-zinc-800 dark:text-zinc-100`}
            >
              Add Transaction
            </AlertDialogTitle>
            <AlertDialogDescription
              className={`${inter.className} text-zinc-600 dark:text-zinc-400`}
            >
              Enter the transaction details below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          {/* Form integrated into the dialog */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 p-4"
            >
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className={`${inter.className} text-zinc-700 dark:text-zinc-300`}
                    >
                      Amount
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-zinc-400" />
                        <Input
                          placeholder="0.00"
                          className={`${roboto_mono.className} pl-10 bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700`}
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
                    <FormLabel
                      className={`${inter.className} text-zinc-700 dark:text-zinc-300`}
                    >
                      Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className={`${roboto_mono.className} bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700`}
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
                    <FormLabel
                      className={`${inter.className} text-zinc-700 dark:text-zinc-300`}
                    >
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
                    <FormLabel
                      className={`${inter.className} text-zinc-700 dark:text-zinc-300`}
                    >
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
