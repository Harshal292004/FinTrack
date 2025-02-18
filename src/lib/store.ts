import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user/userSlice";
import { transactionReducer } from "./features/transaction/transactionSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      userReducer,
      transactionReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
