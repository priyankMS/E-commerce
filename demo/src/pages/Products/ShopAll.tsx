import React, { useMemo, useState } from "react";
import { Data, useGetAllProductQuery } from "../../redux/query/apiSlice";
import { Link } from "react-router-dom";


const ShopAll: React.FC = () => {
  const { data, isLoading, error } = useGetAllProductQuery();

  const [searchItem, setSearchItem] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("");
  const [activeButton, setActiveButton] = useState<string>("");
  const [selectOption,setSelectOption] = useState<string>("");

  

  const handlePriceRange = (price: string) => {
    setPriceRange(price);
  };

  const filterByPrice = (item: Data) => {
    const price = item.price;
    switch (priceRange) {
      case "0":
        return price < 50;
      case "50":
        return price >= 50 && price < 100;
      case "100":
        return price >= 100 && price < 200;
      case "200":
        return price >= 200 && price < 500;
      case "500":
        return price >= 500;
      default:
        return true;
    }
  };

  const filteredData = useMemo(() => {
    return Array.isArray(data)
      ? data?.filter(
          (item: Data) =>
            (item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
              item.price.toString().includes(searchItem) ||
              item.brand.toLowerCase().includes(searchItem.toLowerCase()) ||
              item.category.toLowerCase().includes(searchItem.toLowerCase())) &&
            filterByPrice(item)
        )
      : [];
  }, [data, searchItem, filterByPrice]);


 
  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
     setSelectOption(e.target.value);
  }

  const sortedData = useMemo(() => {
    if (selectOption === "LowToHigh") {
      return filteredData.slice().sort((a: Data, b: Data) => a.price - b.price);
    } else if (selectOption === "highToLow") { 
      return filteredData.slice().sort((a: Data, b: Data) => b.price - a.price);
    } else {
      return filteredData;
    }
  }, [filteredData, selectOption]);


  return (
    <div className=" py-8 w-full  h-screen flex justify-around">
      {/* Left Sidebar */}
      <aside className="lg:w-[20%]  w-[30%] h-[72%] md:w-[70%] sm:w-[30%] sm:p-4  md:h-[80%] bg-gray-100">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search item"
            className="border border-gray-300 rounded px-4 py-2 w-full"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchItem(e.target.value)
            }
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
              handlePriceRange("");
              setActiveButton("");
            }}
          >
            All
          </button>
          <button
            className={`bg-gray-200 text-gray-800 md:px-4 md:py-1 text-sm sm:text-base md:text-base p-1 sm:p-0 rounded mb-2 w-full ${
              activeButton === "0" && "bg-green-300"
            }`}
            onClick={() => {
              handlePriceRange("0");
              setActiveButton("0");
            }}
          >
            Below $50
          </button>
          <button
            className={`bg-gray-200 text-gray-800 md:px-4 md:py-1 text-sm sm:text-base md:text-base p-1 sm:p-0 rounded mb-2 w-full ${
              activeButton === "1" && "bg-green-300"
            }`}
            onClick={() => {
              handlePriceRange("50");
              setActiveButton("1");
            }}
          >
            $50 - $100
          </button>
          <button
            className={`bg-gray-200 text-gray-800 md:px-4 md:py-1 text-sm sm:text-base md:text-base p-1 sm:p-0 rounded mb-2 w-full ${
              activeButton === "2" && "bg-green-300"
            }`}
            onClick={() => {
              handlePriceRange("100");
              setActiveButton("2");
            }}
          >
            $100 - $200
          </button>
          <button
            className={`bg-gray-200 text-gray-800 md:px-4 md:py-1 text-sm sm:text-base md:text-base p-1 sm:p-0 rounded mb-2 w-full ${
              activeButton === "3" && "bg-green-300"
            }`}
            onClick={() => {
              handlePriceRange("200");
              setActiveButton("3");
            }}
          >
            $200 - $500
          </button>
          <button
            className={`bg-gray-200 text-gray-800 md:px-4 md:py-1 text-sm sm:text-base md:text-base p-1 sm:p-0 rounded mb-2 w-full ${
              activeButton === "4" && "bg-green-300"
            }`}
            onClick={() =>{ handlePriceRange("500");setActiveButton("4") }}
          >
            Above $500
          </button>
        </div>

        <div>
         
          <select id="sortOrder" value={selectOption} onChange={handleOptionChange}>
           <option >filter</option> 
           <option value="LowToHigh">Low to High</option>
           <option value="highToLow">High to Low</option>
          </select>
        </div>
      </aside>
      {/* Right Content */}
      <main className="w-[80%] p-4 overflow-y-auto h-full">
        {error ? (
          <div className="text-red-600 text-center">
            Oh no, there was an error
          </div>
        ) : isLoading ? (
          <div className="text-gray-600 text-center">Loading...</div>
        ) : data ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {!isLoading && filteredData.length === 0 && (
              <p>No products found.</p>
            )}
            {sortedData?.map((item: Data) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 shadow-lg rounded-md"
              >
                <div className="flex justify-center">
                  <Link to={`/productDetail/${item.id}`}>
                    <img
                      className="cursor-pointer h-72 object-contain"
                      src={item?.thumbnail}
                      alt={item.title}
                    />
                  </Link>
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-gray-800 font-semibold">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default ShopAll;
