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
import userApi, { authReducer } from "@/api/auth";
import cartApi, { cartReducer } from "@/api/cart";
import couponsApi, { couponsReducer } from "@/api/coupons";
import orderedProductApi, { orderedProductReducer } from "@/api/orderedProduct";
import commentApi from "@/api/comment";


// Cấu hình persist ( lưu localStorage )
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};
const rootReducer = combineReducers({
  [userApi.reducerPath]:authReducer,
  [cartApi.reducerPath]: cartReducer,
  [productApi.reducerPath]: productReducer,
  [categoryApi.reducerPath]: categoryReducer,
  [sizeApi.reducerPath]: sizeReducer,
  [colorApi.reducerPath]: colorReducer,
  [couponsApi.reducerPath]: couponsReducer,
  [orderedProductApi.reducerPath]: orderedProductReducer,
  [commentApi.reducerPath]: commentApi.reducer,
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
      cartApi.middleware,
      productApi.middleware,
      categoryApi.middleware,
      sizeApi.middleware,
      colorApi.middleware,
      couponsApi.middleware,
      orderedProductApi.middleware,
      userApi.middleware,
      couponsApi.middleware,
      commentApi.middleware
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
