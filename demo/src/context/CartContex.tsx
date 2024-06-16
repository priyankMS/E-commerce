import React, { createContext, useReducer } from "react";


type ChilderType = {
  children: React.ReactNode;
};
export type DataCart = {
  quantity?:number;  
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
};


type CartProductType = {
  cartProduct: DataCart[];

  addCart: (item: DataCart) => void;
  removeCart: (id: number) => void;
  resetCart: () => void;
  increadItem:(item:DataCart) =>void 
  decrementItem:(item:DataCart)=>void
};

type ActionType =
  | { type: "ADD_CART"; payload: DataCart }
  | { type: "REMOVE_CART"; payload: number }
  | { type: "RESET_CART" }
  | { type:"INCREASE" ; payload:DataCart}
  | { type:"DECRESE" ; payload:DataCart}

//reducer function


const cartReducer = (state: DataCart[], action: ActionType) => {
  switch (action.type) {
    case "ADD_CART":
      return [...state, action.payload];
      
    case "REMOVE_CART":
      return state.filter((item) => item.id !== action.payload);
    case "RESET_CART":
      return [];
      case "INCREASE":
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity  + 1 }
            : item
        );
    case "DECRESE":
      
        return state.map( item=> item.id === action.payload.id && item.quantity >1 
           ?  {...item,quantity:item.quantity -1 }:item
        )
    default:
      return state;
  }
};

// Initialize context with default values to avoid type assertion
export const CartContext = createContext<CartProductType>({
  cartProduct: [],

  addCart: () => {},
  removeCart: () => {},
  resetCart: () => {},
  increadItem:() =>{},
  decrementItem:()=>{}

});

export const CartProvider = ({ children }: ChilderType) => {
  const [cartProduct, dispatch] = useReducer(cartReducer, []);

   const addCart = (item: DataCart) => {
    // Check if the item already exists in the cart
    const existingItem = cartProduct.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // If the item exists, increment its quantity
      dispatch({ type: "INCREASE", payload: item });
    } else {
      // If the item doesn't exist, add it to the cart with a quantity of one
      dispatch({ type: "ADD_CART", payload: { ...item, quantity: 1 } });
    }
  };

  const removeCart = (id: number) => {
    dispatch({ type: "REMOVE_CART", payload: id });
  };

  const resetCart = () => {
    dispatch({ type: "RESET_CART" });
  };

  const increadItem = (item:DataCart)=>{
      dispatch({type:"INCREASE",payload:item})
  }
 
   const decrementItem = (item:DataCart)=>{
    dispatch({type:'DECRESE',payload:item})
   }

  return (
    <CartContext.Provider
      value={{ decrementItem,increadItem, resetCart, addCart, cartProduct, removeCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
