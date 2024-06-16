import React, { useCallback, useMemo, useState } from "react";
import {
  Data,
  useGetProductByCategoriesQuery,
} from "../../redux/query/apiSlice";
import ShowCatProdu from "./ShowCatProdu";

const CategoryProduct: React.FC = () => {
  const { data: smartphones } = useGetProductByCategoriesQuery("smartphones");
  const { data: laptops } = useGetProductByCategoriesQuery("laptops");
  const { data: fragrances } = useGetProductByCategoriesQuery("fragrances");
  const { data: skincare } = useGetProductByCategoriesQuery("skincare");
  const { data: groceries } = useGetProductByCategoriesQuery("groceries");
  const { data: homeDecoration } =
    useGetProductByCategoriesQuery("home-decoration");
 

  const [categoryData, setCategoryData] = useState<Data[] | undefined>(
    undefined
  );
     
    const [searchItem, setSearchItem] = useState<string>("");
    const [priceRange, setPriceRange] = useState<string>("");

  const [selectOption,setSelectOption ] = useState<string>("");

  
  const handleClick = (data: Data[] | undefined) => {
    setCategoryData(data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
  };

  const handlePriceRange =useCallback((price: string) => {
    setPriceRange(price);
  },[]) 

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

  const filterData = categoryData?.filter(
    (item: Data) =>
      (item.title.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchItem.toLowerCase()) ||
        item.category.toLowerCase().includes(searchItem.toLowerCase())) &&
      filterByPrice(item)
  );

  if (!categoryData && smartphones) {
    setCategoryData(smartphones);
  }
 
   const sortedData = useMemo(()=>{
      if(selectOption === "LowToHigh"){
        return filterData?.slice().sort((a:Data,b:Data)=>a.price-b.price)
      }
      else if(selectOption === "HighToLow"){
        return filterData?.slice().sort((a:Data,b:Data)=>b.price-a.price)
      }
      else {
        return filterData
      }
   },[filterData,selectOption])
  

  return (
    <div>
      <div className="">
        <ul className="grid p-1  grid-cols-3 md:grid-cols-6 mt-3 justify-center uppercase cursor-pointer  md:gap-5 items-center mb-5">
          <li
            className="  py-2.5 xl:px-5 px-1 me-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => handleClick(smartphones)}
          > 
            Smartphone
          </li>
          <li
            className=" p-2  me-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => handleClick(laptops)}
          >
            Laptop
          </li>
          <li
            className="py-2.5 xl:px-5 px-1 me-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => handleClick(fragrances)}
          >
            Fragrances
          </li>
          <li
            className="py-2.5 xl:px-5 px-1 me-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => handleClick(skincare)}
          >
            Skincare
          </li>
          <li
            className="py-2.5 xl:px-5 px-1 me-2 mb-2 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => handleClick(groceries)}
          >
            Groceries
          </li>
          <li
            className="py-2.5 xl:px-5 px-1 me-2 mb-2   text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => handleClick(homeDecoration)}
          >
            Home Decoration
          </li>
        </ul>
      </div>

      <ShowCatProdu
        categoryData={sortedData}
        handleSearch={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleSearch(e)
        }
        handlePrice={(price: string) => handlePriceRange(price)}
        selectOption = {selectOption}
        setSelectOption = {setSelectOption}
    />
    </div>
  );
};

export default CategoryProduct;
