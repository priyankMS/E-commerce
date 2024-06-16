import React, { useContext, useState } from "react";
import { Data } from "../../redux/query/apiSlice";
import { CartContext } from "../../context/CartContex";
import { useAppSelectore } from "../../redux/hook";
import { toast } from "react-toastify";


interface Props {
  categoryData: Data[] | undefined;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePrice: (price: string) => void;
  selectOption: string;
  setSelectOption:React.Dispatch<React.SetStateAction<string>>
}

const ShowCatProdu: React.FC<Props> = ({
 
 
  categoryData,
  handleSearch,
  handlePrice,
  selectOption,
  setSelectOption
}) => {
  const { addCart, cartProduct } = useContext(CartContext);

  const auth = useAppSelectore((state) => state.auth.isAuthentication);
  const [activeButton, setActiveButton] = useState<string>("");

  const addCartHandler = (item: Data) => {
    const check = cartProduct.find((product) => product.id === item.id);
    if (!auth) {
      toast.error("Please login to add product in cart");
    } else if (check) {
      toast.error("Product already in cart");
    } else {
      addCart(item);
    }
  };



  const handleOptionChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
     setSelectOption(e.target.value)
  }
  

  return (
    <div className=" w-full  h-screen flex justify-around  overflow-hidden">
      <aside className="lg:w-[20%]  w-[30%] md:h-[70%] h-[65%] sm:w-[30%] sm:p-4  bg-gray-100">
        <div className="mb-4">
          <div>
            <input
              type="text"
              placeholder="Search Product"
              className="border border-gray-300 rounded sm:px-4 sm:py-2  px-2 py-1 w-full"
              onChange={handleSearch}
            />
          </div>
          <div>
            <h3 className="md:text-lg  sm:text-base text-sm  mt-1 sm:mt-0 font-semibold  mb-2">
              Sort by price
            </h3>

            <button
              className={`bg-gray-200 text-gray-800 md:px-4 md:py-1 text-sm sm:text-base md:text-base p-1 sm:p-0 rounded mb-2 w-full ${
                activeButton === "" && "bg-green-300"
              }`}
              onClick={() => {
                handlePrice("");
                setActiveButton("");
              }}
            >
              All
            </button>

            <button
              className={`bg-gray-200 text-gray-800 md:px-4 md:py-1 text-sm sm:text-base md:text-base p-1 sm:p-0 rounded mb-2 w-full ${
                activeButton === "1" && "bg-green-300"
              }`}
              onClick={() => {
                handlePrice("0");
                setActiveButton("1");
              }}
            >
              Below $50
            </button>

            <button
              className={`bg-gray-200 text-gray-800 md:px-4 md:py-1 text-sm sm:text-base md:text-base p-1 sm:p-0 rounded mb-2 w-full ${
                activeButton === "2" && "bg-green-300"
              }`}
              onClick={() => {
                handlePrice("50");
                setActiveButton("2");
              }}
            >
              $50 - $100
            </button>

            <button
              className={`bg-gray-200 text-gray-800 md:px-4 md:py-1 text-sm sm:text-base md:text-base p-1 sm:p-0 rounded mb-2 w-full ${
                activeButton === "3" && "bg-green-300"
              }`}
              onClick={() => {
                handlePrice("100");
                setActiveButton("3");
              }}
            >
              $100 - $200
            </button>

            <button
              className={`bg-gray-200 text-gray-800 md:px-4 md:py-1 text-sm sm:text-base md:text-base p-1 sm:p-0 rounded mb-2 w-full ${
                activeButton === "4" && "bg-green-300"
              }`}
              onClick={() => {
                handlePrice("200");
                setActiveButton("4");
              }}
            >
              $200 - $500
            </button>

            <button
              className={`bg-gray-200 text-gray-800 md:px-4 md:py-1 text-sm sm:text-base md:text-base p-1 sm:p-0 rounded mb-2 w-full ${
                activeButton === "5" && "bg-green-300"
              }`}
              onClick={() =>{ handlePrice("500"); setActiveButton("5") }}
            >
              Above $500
            </button>
          </div>

          <div>
            <select className=" w-20 md:w-32" id="sortOrder" value={selectOption} onChange={handleOptionChange}>
                 <option >filter</option>
                 <option value="LowToHigh">Low to Hign</option>
                 <option value="HighToLow">High to Low</option>
            </select>
          </div>
        </div>
      </aside>

      <main className="w-[80%] p-4   sm:ml-10 md:ml-5 lg:ml-2 xl:ml-0 overflow-y-auto h-full">
        
     
       {categoryData && categoryData.length >0  ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryData?.map((item) => (
            <div
              key={item.id}
              className="md:ml-4  relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-white dark:border-gray-100"
            >
              <img
                className="p-2 w-full h-28 sm:h-32 md:h-40 lg:h-48 xl:h-56 object-cover"
                src={item?.thumbnail}
                alt={item.title}
              />
              <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                SALE
              </div>
              <div className="md:p-4 sm:p-3 p-2">
                <h1 className="text-lg font-medium  mb-2">{item.title}</h1>
                <p className="text-sm text-gray-600 mb-2">
                  Brand: {item?.brand}
                </p>
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  ${item.price}
                </p>
                <p className="text-sm truncate text-gray-700">
                  {item.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => addCartHandler(item)}
                    className="px-4 py-2 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded focus:outline-none focus:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a1 1 0 0 1 .786.38l1.882 2.322 2.789.437a1 1 0 0 1 .553 1.705l-2.109 2.045.5 2.899a1 1 0 0 1-1.451 1.055L10 11.621l-2.614 1.377a1 1 0 0 1-1.451-1.055l.5-2.899-2.109-2.045a1 1 0 0 1 .553-1.705l2.789-.437L9.214 2.38A1 1 0 0 1 10 2zm0 2.681l-.732.901-.442.546.104.605.595 3.463a1 1 0 0 1-.287.898l-1.601 1.556.374 2.177 2.027-1.069a1 1 0 0 1 .928 0l2.027 1.069.374-2.177-1.601-1.556a1 1 0 0 1-.287-.898l.595-3.463.104-.605-.442-.546-.732-.901a1 1 0 0 1 .463-1.463l3.253-.505a1 1 0 0 1 1.178 1.317l-2.356 4.35a1 1 0 0 1-.373.455l-3.004 1.582a1 1 0 0 1-1.035 0l-3.004-1.582a1 1 0 0 1-.373-.455L5.16 9.835a1 1 0 0 1 1.178-1.317l3.253.505a1 1 0 0 1 .463 1.463z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-yellow-500">
                      {item.rating}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>) :( <div>
          <p className="text-center text-gray-600 ">No products found</p>
        </div>)
}
      </main>
    </div>
  );
};

export default ShowCatProdu;
