import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import productApi, { productReducer } from "../api/product";
import categoryApi, { categoryReducer } from "../api/category";
import sizeApi, { sizeReducer } from "../api/size";
import colorApi, { colorReducer } from "@/api/color";
import couponsApi, { couponsReducer } from "@/api/coupons";

// Cấu hình persist ( lưu localStorage )
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  [productApi.reducerPath]: productReducer,
  [categoryApi.reducerPath]: categoryReducer,
  [sizeApi.reducerPath]: sizeReducer,
  [colorApi.reducerPath]: colorReducer,
  [couponsApi.reducerPath]: couponsReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      productApi.middleware,
      categoryApi.middleware,
      sizeApi.middleware,
      colorApi.middleware,
      couponsApi.middleware
    ),
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default persistStore(store);
