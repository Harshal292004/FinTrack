import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "@/lib/store";
import mongoose from "mongoose";
import {
  addTransactionAction,
  updateTransactionAction,
  deleteTransactionAction,
} from "../../../../actions/transaction.actions"

export interface TransactionState {
  transaction: any; // Ideally type this as your ITransaction or a custom type
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
  user_id,
  amount,
  date,
  description,
}: {
  user_id: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  description: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await addTransactionAction({ user_id, amount, date, description });
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
  description,
  ai_analysis,
}: {
  transaction_id: mongoose.Types.ObjectId;
  index: number;
  amount?: number;
  date?: Date;
  description?: string;
  ai_analysis?: string;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await updateTransactionAction({ transaction_id, index, amount, date, description, ai_analysis });
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
  transaction_id: mongoose.Types.ObjectId;
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

export function getTransaction({
  transaction_id,
  index,
}: {
  transaction_id: mongoose.Types.ObjectId;
  index?: number;
}) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await getTransactionAction({ transaction_id, index });
      dispatch(setTransaction(data.transaction));
    } catch (error: any) {
      dispatch(setError(error.message || "Error getting transaction"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}
