import { configureStore } from "@reduxjs/toolkit";
import Authreducer from "./slice/AuthSlice"
import { apiSlice } from "./query/apiSlice";
import AddressReducer  from "./slice/AddressSlice"
import productReducer from "./slice/productSlice"



export const store = configureStore({
    reducer:{
      auth:Authreducer,
      product:productReducer,
      address:AddressReducer,
      [apiSlice.reducerPath]:apiSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>
              getDefaultMiddleware().concat(apiSlice.middleware)

})
//when i want to data from this api cll
// store.dispatch(FetchData())

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch