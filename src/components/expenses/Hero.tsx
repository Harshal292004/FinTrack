"use client";

// React imports 
import { useEffect, useState } from "react";

// Font imports
import { roboto_mono  ,space_mono, poppins ,inter} from "@/lib/fonts";

// Icon imports 
import { Edit2, Trash2, DollarSign, Calendar } from "lucide-react";


// UI imports 
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "../LoadingSpinner";
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

// Add Expense UI 
import AddExpenseDialog from "../AddExpenseDialog";


// Redux for state management 
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// Redux thunks for transaction manipulation
import { getTransactions, deleteTransaction, updateTransaction } from "@/lib/features/transaction/transactionSlice";

const ExpensesPage = () => {
  // Dispatch for transaction management 
  const dispatch = useAppDispatch();

  // States of user and transaction
  const userState = useAppSelector((state) => state.userReducer);
  const transactionState = useAppSelector((state) => state.transactionReducer);

  // Local state for transactions
  const [transactions, setTransactions] = useState<
    {
      amount: number;
      date: Date;
      description?: string;
    }[]
  >([]);

  // Local state for delete dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTransactionIndex, setSelectedTransactionIndex] = useState<number | null>(null);

  // Local state for edit dialog
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedEditTransactionIndex, setSelectedEditTransactionIndex] = useState<number | null>(null);
  const [editAmount, setEditAmount] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Fetch transactions when the user is available
  useEffect(() => {
    if (userState.user?._id) {
      dispatch(getTransactions({ transaction_id: userState.user._id }));
    }
  }, [dispatch, userState.user]);

  // Update local transactions when the Redux state changes
  useEffect(() => {
    if (transactionState.transaction?.transaction_list) {
      setTransactions(transactionState.transaction.transaction_list);
    }
  }, [transactionState.transaction]);

  if (userState.loading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  

  // Delete handler: open delete dialog for selected transaction
  const handleDelete = (index: number) => {
    setSelectedTransactionIndex(index);
    setDeleteDialogOpen(true);
  };

  // Confirm delete: dispatch deleteTransaction action and close dialog
  const confirmDelete = () => {
    if (selectedTransactionIndex !== null && transactionState.transaction?._id) {
      dispatch(
        deleteTransaction({
          transaction_id: transactionState.transaction._id,
          index: selectedTransactionIndex,
        })
      );
      setDeleteDialogOpen(false);
      setSelectedTransactionIndex(null);
    }
  };

  // Edit handler: open edit dialog with current transaction values prefilled
  const handleEdit = (index: number) => {
    const txn = transactions[index];
    setSelectedEditTransactionIndex(index);
    setEditAmount(txn.amount.toString());
    // Format date as YYYY-MM-DD for date input
    const d = new Date(txn.date);
    const formattedDate = d.toISOString().split("T")[0];
    setEditDate(formattedDate);
    setEditDescription(txn.description || "");
    setEditDialogOpen(true);
  };

  // Confirm edit: dispatch updateTransaction action and close dialog
  const confirmEdit = () => {
    if (selectedEditTransactionIndex !== null && transactionState.transaction?._id) {
      dispatch(
        updateTransaction({
          transaction_id: transactionState.transaction._id,
          index: selectedEditTransactionIndex,
          amount: parseFloat(editAmount),
          date: new Date(editDate),
          description: editDescription,
        })
      );
      setEditDialogOpen(false);
      setSelectedEditTransactionIndex(null);
    }
  };


  // If you don't have any transaction this page will be loaded 
  if (!transactions || transactions.length === 0) {
    return (
    <div className="p-6 max-w-4xl mx-auto mt-20">
      <div className={`${poppins.className} mb-6`}>
        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">Expenses</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Track and manage your financial transactions
        </p>
      </div>
      <div className={`${space_mono}  justify-center items-center w-full`}> No Transactions Found ... </div>
      <AddExpenseDialog></AddExpenseDialog>
    </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-20">

      {/* Add Expense Dialog */}
      <AddExpenseDialog></AddExpenseDialog>

      <div className={`${poppins.className} mb-6`}>
        <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-100">Expenses</h1>
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
                    <DollarSign
                      className={`h-5 w-5 ${
                        transaction.amount >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
                      }`}
                    />
                    <span
                      className={`${roboto_mono.className} text-lg font-semibold ${
                        transaction.amount >= 0 ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"
                      }`}
                    >
                    {Math.abs(transaction.amount).toFixed(2)}
                    </span>
                  </div>
                  <p className={`${inter.className} text-sm text-zinc-700 dark:text-zinc-300 mb-2`}>
                    {transaction.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-zinc-400" />
                    <span className={`${roboto_mono.className} text-xs text-zinc-500 dark:text-zinc-400`}>
                      {new Date(transaction.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
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

      {/* Delete Confirmation Dialog */}
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
            <AlertDialogAction className="bg-red-500 hover:bg-red-600 text-white" onClick={confirmDelete}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Transaction Dialog */}
      <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <AlertDialogContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className={`${poppins.className} text-zinc-800 dark:text-zinc-100`}>
              Edit Transaction
            </AlertDialogTitle>
            <AlertDialogDescription className={`${inter.className} text-zinc-600 dark:text-zinc-400`}>
              Update the transaction details below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4 space-y-4">
            <div>
              <label className={`${inter.className} block text-sm text-zinc-700 dark:text-zinc-300 mb-1`}>Amount</label>
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700"
              />
            </div>
            <div>
              <label className={`${inter.className} block text-sm text-zinc-700 dark:text-zinc-300 mb-1`}>Date</label>
              <input
                type="date"
                value={editDate}
                onChange={(e) => setEditDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700"
              />
            </div>
            <div>
              <label className={`${inter.className} block text-sm text-zinc-700 dark:text-zinc-300 mb-1`}>Description</label>
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full px-3 py-2 border rounded-md bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-700"
                rows={3}
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="bg-green-500 hover:bg-green-600 text-white" onClick={confirmEdit}>
              Update
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ExpensesPage;
