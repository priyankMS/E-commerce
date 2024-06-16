import React, { useContext } from "react";
import { Data } from "../../redux/query/apiSlice";
import { CartContext } from "../../context/CartContex";

type PropType = {
  product: Data,
  
  index: number,
  clickHandler: (id: number) => void,
  handleCart: (id: number) => void,
  
}
 

export const CartItem: React.FC<PropType> = ({  product, index, clickHandler, handleCart }) => {
 
  
  const {increadItem,decrementItem} = useContext(CartContext)
  
  const addHandler = (product:Data) => {
     increadItem(product)
    
  }

  const removeHandler = (item: Data) => {
   decrementItem(item)
  }

  return (
    <div key={index} className="w-full flex-col md:flex-row  items-center gap-1  justify-around flex border p-4 md:p-2">
      <div>
        <img
          onClick={() => handleCart(product.id)}
          className="cursor-pointer w-48 md:w-60"
          src={product.thumbnail}
          alt={product.title}
        />
      </div>
      <div className="flex flex-col  md:flex-row    justify-between items-end ml-4">
        <div>
        <h1
          className="text-lg font-semibold hover:text-blue-700 cursor-pointer"
          onClick={() => handleCart(product.id)}
        >
          Model: {product?.title}
        </h1>
        <h1 className="text-sm text-gray-600">Brand: {product?.brand}</h1>
        <h2 className="text-lg">Price: {product?.price}</h2>
        <h2 className="text-lg">Discount: {product?.discountPercentage}</h2>
        <button
          className="mt-2  px-1   md:px-2 py-1 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={() => clickHandler(product.id)}
        >
          REMOVE
        </button>
        </div>
        <div className="mt-2">
          <button className=" w-7 bg-slate-200  rounded-s-full  " onClick={() => removeHandler(product)}>-</button>
          <span className="mx-2 w-10 border  md:p-2 px-3">{product?.quantity}</span>
          <button className=" w-7 bg-slate-200  rounded-e-full" onClick={()=>addHandler(product)}>+</button>
        </div>
      </div>
    </div>
  )
}
