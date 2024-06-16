import { useContext } from "react";
import { CartContext } from "../../context/CartContex";
import { Data, useGetProductByCategoriesQuery } from "../../redux/query/apiSlice";
import { useAppSelectore } from "../../redux/hook";
import { toast } from "react-toastify";

// import { toast } from "react-toastify";

const SmartPhone = () => {

    const {data:smartphones} = useGetProductByCategoriesQuery("smartphones")
    const {addCart,cartProduct} = useContext(CartContext)

    
    const auth = useAppSelectore((state) => state.auth.isAuthentication);

    const addCartHandler = (item: Data) => {
        const check  = cartProduct.find((product)=>product.id === item.id)
        if (!auth ) {
            toast.error("Please login to add product in cart")
        } else if( check) {
      
          toast.error("Product already in cart")
        }else{
          addCart(item);
          toast.success("Product added in cart")
        }
    
        };

    return (
        <div>
          <div className="grid p-4  gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
            {smartphones?.map((item: Data) => (
                <div key={item.id} className="md:ml-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <img className="p-2 w-full h-48 object-cover" src={item?.thumbnail} alt={item.title} />
                    <div className="p-4">
                        <h1 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h1>
                        <p className="text-sm text-gray-600 mb-2">Brand: {item?.brand}</p>
                        <p className="text-lg font-semibold text-gray-900 mb-2">${item.price}</p>
                        <p className="text-sm text-gray-700">{item.description}</p>
                        <div className="mt-4 flex justify-between items-center">
                            <button
                             onClick={()=>addCartHandler(item)}
                            className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:bg-blue-600">
                                Add to Cart
                            </button>
                            <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 2a1 1 0 0 1 .786.38l1.882 2.322 2.789.437a1 1 0 0 1 .553 1.705l-2.109 2.045.5 2.899a1 1 0 0 1-1.451 1.055L10 11.621l-2.614 1.377a1 1 0 0 1-1.451-1.055l.5-2.899-2.109-2.045a1 1 0 0 1 .553-1.705l2.789-.437L9.214 2.38A1 1 0 0 1 10 2zm0 2.681l-.732.901-.442.546.104.605.595 3.463a1 1 0 0 1-.287.898l-1.601 1.556.374 2.177 2.027-1.069a1 1 0 0 1 .928 0l2.027 1.069.374-2.177-1.601-1.556a1 1 0 0 1-.287-.898l.595-3.463.104-.605-.442-.546-.732-.901a1 1 0 0 1 .463-1.463l3.253-.505a1 1 0 0 1 1.178 1.317l-2.356 4.35a1 1 0 0 1-.373.455l-3.004 1.582a1 1 0 0 1-1.035 0l-3.004-1.582a1 1 0 0 1-.373-.455L5.16 9.835a1 1 0 0 1 1.178-1.317l3.253.505a1 1 0 0 1 .463 1.463z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm text-yellow-500">{item.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        </div>
    )
}

export default SmartPhone;