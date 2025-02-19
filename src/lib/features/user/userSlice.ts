import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../../../types";
import { AppDispatch } from "@/lib/store";
import { setTransaction } from "../transaction/transactionSlice";
import mongoose from "mongoose";
import {
  registerUserAction,
  loginUserAction,
  updateUserAction,
  deleteUserAction,
} from '../../../../actions/user.actions'


export interface UserState {
  user:IUser| null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRegister: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setLogin: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setUpdate: (state, action) => {
      state.user = action.payload;
      state.error = null;
    },
    setDelete: (state) => {
      state.user = null;
      state.error = null;
    },
    setLogout:(state)=>{
      state.user=null;
      state.error= null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setRegister, setLogin, setUpdate, setDelete, setError, setLoading ,setLogout} = userSlice.actions;
export const userReducer=userSlice.reducer

export function registerUser(user: { name: string }) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await registerUserAction(user);
      dispatch(setRegister(data.user));
      dispatch(setTransaction(data.transaction));
    } catch (error: any) {
      dispatch(setError(error.message || "Registration error"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function loginUser(user: { name: string }) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await loginUserAction(user);
      dispatch(setLogin(data.user));
      dispatch(setTransaction(data.transaction))
    } catch (error: any) {
      dispatch(setError(error.message || "Login error"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function updateUser({ id, name }: { id: mongoose.Schema.Types.ObjectId; name: string }) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const data = await updateUserAction({ id, name });
      dispatch(setUpdate(data.user));
    } catch (error: any) {
      dispatch(setError(error.message || "Update error"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function deleteUser({ id }: { id: mongoose.Schema.Types.ObjectId }) {
  return async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      await deleteUserAction({ id });
      dispatch(setDelete());
    } catch (error: any) {
      dispatch(setError(error.message || "Delete error"));
    } finally {
      dispatch(setLoading(false));
    }
  };
}
