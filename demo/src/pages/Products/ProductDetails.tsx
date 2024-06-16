import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../../redux/query/apiSlice";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { CartContext } from "../../context/CartContex";
import { toast } from "react-toastify";
import Spinner from "../UI/Spinner";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetProductByIdQuery(id ?? "");
  const { cartProduct, addCart } = useContext(CartContext);
  const [photo, setPhoto] = useState<string>("");
  const [Loading, setLoading] = useState<boolean>(false);
  const [isRotated, setIsRotated] = useState<boolean>(false);
  const navigate = useNavigate();

  function clickHandler() {
    const ifExist = cartProduct.find((product) => product.id === data?.id);
    
    if (!ifExist && data) {
      addCart(data);
    } else {
      toast.error("Product already exists in the cart");
    }
  }

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/cartCheckOut/${data?.id}`);
    }, 1000);
  }

  const acctualPrice = Math.floor(((data?.price ?? 0) * 100) / (100 - (data?.discountPercentage ?? 0)));

  const toggleRotation = () => {
    setIsRotated(!isRotated);
  };

  return (
    <div className="flex flex-col md:flex-row mt-5 p-1">
      <section className="w-full md:w-1/2">
        <div className="flex flex-col md:flex-row">
          <div className="md:h-[400px] border border-gray-300 w-full md:w-28 mr-2 p-2 overflow-y-auto">
            <div className="flex md:flex-col flex-wrap justify-between md:flex-nowrap">
              {data?.images.slice(0, 4).map((image, index) => (
                <img
                  key={index}
                  className="mb-1 object-cover h-[90px] w-[90px] cursor-pointer"
                  src={image}
                  alt={data?.title}
                  onClick={() => setPhoto(image)}
                />
              ))}
            </div>
          </div>
          <div className="border border-gray-300 mb-4 w-full">
            <img
              className={`h-[400px] w-full object-contain p-2 transition-transform duration-500 ${isRotated ? 'rotate-90' : ''}`}
              src={photo ? photo : data?.thumbnail}
              alt={data?.title}
              onClick={toggleRotation}
            />
          </div>
        </div>
        <div className="flex  justify-around lg:ml-20 mt-4">
          <button
            onClick={clickHandler}
            className="w-[150px] bg-yellow-300 hover:bg-yellow-500 text-gray-800 hover:text-white font-semibold rounded-md text-lg shadow-lg h-[40px] flex items-center justify-center"
          >
            Add to Cart <ShoppingCartOutlined className="ml-1" />
          </button>
          <button
            onClick={handleClick}
            className="w-[150px] bg-yellow-500 hover:bg-yellow-700 text-gray-800 hover:text-white font-semibold rounded-md text-lg shadow-lg h-[40px] flex items-center justify-center"
          >
            {Loading ? (<Spinner />) : (<> Buy now <EyeOutlined className="ml-1" /></>)}
          </button>
        </div>
      </section>
      <div className="ml-2 w-full md:w-1/2 mt-4 md:mt-0">
        <h1 className="font-mono text-lg font-bold">
          BRAND: <span className="font-medium">{data?.brand}</span>
        </h1>
        <h2 className="mt-2 text-lg font-semibold mb-2 font-mono">
          Model: <span className="font-medium">{data?.title}</span>
        </h2>
        <p className="font-semibold mb-2 font-mono">
          Details: <span className="font-medium">{data?.description}</span>
        </p>
        <p className="font-semibold mb-2 font-mono">
          Price:{" "}
          <span className="ml-1 text-green-700 font-semibold">
            ${acctualPrice}
          </span>
        </p>
        <p className="font-semibold mb-2 font-mono">
          Discount:{" "}
          <span className="ml-1 text-red-400 font-semibold">
            ${data?.discountPercentage}
          </span>
        </p>
        <p className="font-semibold mb-2 font-mono">
          Discount Price:{" "}
          <span className="ml-1 text-green-700 font-semibold">
            ${data?.price}
          </span>
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
