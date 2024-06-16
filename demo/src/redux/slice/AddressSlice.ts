import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AddressData {
    find(arg0: (data: AddressData) => boolean): unknown;
    id?:string;
    name?: string;
    pincode: string;
    addressAreaAndStreet: string;
    cityDistrictTown: string;
    landmark?: string;
    addressType?: string;
    mobileNumber: string;
    locality?: string;
    state: string;
    alternatePhone?: string;
    deliveryPreference: string;
  }
  
interface AddressState {
addressData:AddressData[]
}


const initialState:AddressState ={
    addressData : []
}

export const AddressSlice =  createSlice({
    name:'address',
    initialState,
    reducers:{
        addAdressData :(state,action:PayloadAction<AddressData>)=>{
          state.addressData.push(action.payload)
        },
        editAddressData: (state, action: PayloadAction<AddressData>) => {
          const index = state.addressData.findIndex((data) => data.id === action.payload.id);
          if (index !== -1) {
              state.addressData[index] = action.payload;
          }
      },
        deleteAddressData:(state,action:PayloadAction<string>)=>{
          state.addressData = state.addressData.filter((data)=> data.id !== action.payload)
        
        }
    }
})

export const  {addAdressData,editAddressData,deleteAddressData } = AddressSlice.actions;
export default AddressSlice.reducer