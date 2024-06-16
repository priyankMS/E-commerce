import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export type  ProductData ={
    id:number,
    title:string,
    description:string,
    price:number,
    discountPercentage:number,
    rating:number,
    stock:number,
    brand:string,
    category:string,
    thumbnail:string,
     images:string[],


}

type initialStateType = {
    productData:ProductData[],
    status:string | null
}

const initialState:initialStateType ={
    productData: [],
    status:null
}

export const FetchData = createAsyncThunk<ProductData[]>("products/productsFetch",
   async ()=>{
     const response =  await  axios.get("http://localhost:3000/products")
     return response?.data
    }
)



export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
      builder.addCase(FetchData.pending,(state)=>{
        state.status="pendiing"
      }),
      builder.addCase(FetchData.fulfilled,(state,action)=>{
        state.productData=action.payload
        state.status="success"
      }),
      builder.addCase(FetchData.rejected,(state)=>{
        state.status = "rejected"
      })


      
    }

})

export default productSlice.reducer