"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getTransactions } from "@/lib/features/transaction/transactionSlice";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";

export function RecentTransactions() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Get user data from the Redux store (needed to supply transaction_id)
  const userState = useAppSelector((state) => state.userReducer);
  // Get the transaction data from the Redux store
  const transactionState = useAppSelector((state) => state.transactionReducer);

  // Fetch transactions from MongoDB when the user is available.
  useEffect(() => {
    if (userState.user?._id) {
      dispatch(getTransactions({ transaction_id: userState.user._id }));
    }
  }, [dispatch, userState.user]);

  // Access the transaction list from your Redux state.
  // We assume your transaction object has a field called "transaction_list".
  const transactions =
    transactionState.transaction?.transaction_list || [];

  // Only show the 10 most recent transactions.
  const recentTransactions = transactions.slice(0, 10);



  return (
    <Table>
      <TableHeader>
        <div className="">
          Recent Expenses
        </div>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentTransactions.map((txn, index) => (
          <TableRow key={index}>
            <TableCell>
              {new Date(txn.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </TableCell>
            <TableCell>{txn.description}</TableCell>
            <TableCell className="text-right">${txn.amount.toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
