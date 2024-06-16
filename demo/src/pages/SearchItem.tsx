import Input from "antd/es/input";
import axios from "axios";
import  { useEffect, useState } from "react";
import { Data } from "../redux/query/apiSlice";
import { useNavigate } from "react-router-dom";


const SearchItem = () => {
    const navigate = useNavigate()
    const [suggestions, setSuggestions] = useState([]);
    const [isOpen,setIsOpen] = useState(false)
   

    
     
    const { Search } = Input;

  const handleSearch = async (value: string) => {
    try {
      const response = await axios.get(
        `http://localhost:4040/api/products?brand=${value}`
      );
      setSuggestions(response.data);
      setIsOpen(true)
    } catch (error) {
      console.log(error);
    }
  };

 useEffect(()=>{
    const handleClickOutside = (event: MouseEvent) => {
        if (event?.target instanceof Element && event.target.closest('.ant-input-search') === null) {
            setIsOpen(false);
        }
    };
    document.addEventListener('click',handleClickOutside);
    return ()=>document.removeEventListener('click',handleClickOutside)
 },[])

 const handleClick=(id:number)=>{
    navigate(`/productDetail/${id}`)
 }

  return (
    <div>
      <div className="mr-5 ">
        <Search
          placeholder="search items"
          allowClear
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        { isOpen &&
          <div className=" sm:w-[20%] md:w-[20%] lg:w-[18%] absolute z-50 bg-white rounded-md shadow-md mt-1 ">
      {suggestions.map((product:Data) => (
        <div onClick={()=>handleClick(product.id)} className="  flex items-center p-2 hover:bg-gray-100 cursor-pointer"  key={product?.id}>
          <img  className="w-10 h-10 mr-2" src={product?.thumbnail} alt={product?.thumbnail} />
          <span className=" text-black text-sm">{product?.title}</span>
        </div>
      ))}
    </div>

    }
      </div>
    </div>
  );
};

export default SearchItem;
