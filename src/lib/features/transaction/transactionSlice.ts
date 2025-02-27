import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/lib/store";
import mongoose from "mongoose";
import {
  addTransactionAction,
  updateTransactionAction,
  deleteTransactionAction,
  getTransactionsAction,
} from "../../../../actions/transaction.actions"
import type { ITransaction } from "../../../../types";
export interface TransactionState {
  transaction: ITransaction|null;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  transaction: null,
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setTransaction: (state, action: PayloadAction<any>) => {
      state.transaction = action.payload;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setTransaction, setError, setLoading } = transactionSlice.actions;
export const transactionReducer= transactionSlice.reducer;

export function addTransaction({
  transaction_id,
  amount,
  date,
  description,
}: {
  transaction_id: mongoose.Schema.Types.ObjectId;
  amount: number;
  date: Date;
  description: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await addTransactionAction({ transaction_id, amount, date, description });
      dispatch(setTransaction(data.transaction));
    } catch (error: any) {
      dispatch(setError(error.message || "Error adding transaction"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function updateTransaction({
  transaction_id,
  index,
  amount,
  date,
  description
}: {
  transaction_id: mongoose.Schema.Types.ObjectId;
  index: number;
  amount?: number;
  date?: Date;
  description?: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await updateTransactionAction({ transaction_id, index, amount, date, description });
      dispatch(setTransaction(data.transaction));
    } catch (error: any) {
      dispatch(setError(error.message || "Error updating transaction"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function deleteTransaction({
  transaction_id,
  index,
}: {
  transaction_id: mongoose.Schema.Types.ObjectId;
  index: number;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await deleteTransactionAction({ transaction_id, index });
      dispatch(setTransaction(data.transaction));
    } catch (error: any) {
      dispatch(setError(error.message || "Error deleting transaction"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}


export function getTransactions({
  transaction_id,
}: {
  transaction_id: mongoose.Schema.Types.ObjectId;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await getTransactionsAction({ transaction_id });
      dispatch(setTransaction(data.transaction));
    } catch (error: any) {
      dispatch(setError(error.message || "Error fetching transactions"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}
