import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user/userSlice";
import { transactionReducer } from "./features/transaction/transactionSlice";
import { themeReducer } from "./features/themes/themeSlice";
export const makeStore = () => {
  return configureStore({
    reducer: {
      userReducer,
      transactionReducer,
      themeReducer
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;

export type AppDispatch = AppStore["dispatch"];
