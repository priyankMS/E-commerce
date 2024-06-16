import React, { useMemo, useState } from "react";
import { CartContext } from "../../context/CartContex";
import { Link, useNavigate } from "react-router-dom";
import { CartItem } from "./CartItem";
import { Data } from "../../redux/query/apiSlice";
import Spinner from "../UI/Spinner";

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartProduct, removeCart } = React.useContext(CartContext);
  const [loading, setLoading] = useState<boolean>(false);

  function clickHandler(id: number) {
    removeCart(id);
  }

  function handleCart(id: number) {
    navigate(`/productDetail/${id}`);
  }

  function handleClick() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate(`/cartCheckOut/cart`);
    }, 1000);
  }

  const totalPrice = useMemo(() => {
    return cartProduct.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
  }, [cartProduct]);

  const findTotalItem = cartProduct.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  const totalDiscount = Math.floor(
    cartProduct.reduce(
      (acc, item) => acc + item.discountPercentage * (item.quantity || 0),
      0
    )
  );

  const actualPrice = useMemo(()=>{
    return Math.floor((totalPrice * 100) / (100 - totalDiscount))
  },[totalDiscount,totalPrice]);

  return (
    <>
      {cartProduct.length > 0 ? (
        <div className="flex flex-col md:flex-row justify-between w-full mt-2 p-4">
          <div className="w-full md:w-[60%] mb-4 md:mb-0">
            <div className="overflow-y-auto max-h-[500px] border border-gray-200 rounded-lg p-4 shadow-md">
              {/* Render each unique product */}
              {[...new Set(cartProduct.map((item: Data) => item.id))].map(
                (id, index) => (
                  <CartItem
                    key={index}
                    product={cartProduct.find((item) => item.id === id)!}
                    index={index}
                    clickHandler={clickHandler}
                    handleCart={handleCart}
                  />
                )
              )}
            </div>

            <div className="bg-slate-200 p-4 mt-4 rounded-lg shadow-md text-center">
              <button
                onClick={handleClick}
                className="bg-orange-700 text-white font-semibold text-md w-full md:w-52 p-2 h-[50px] rounded-lg shadow-lg hover:bg-orange-800"
              >
                {loading ? <Spinner /> : "Proceed to Checkout"}
              </button>
            </div>
          </div>

          <div className="border p-4 md:w-1/3 rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold">PRICE DETAILS</h2>
            <hr className="my-2 border-t" />
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-600 text-sm md:text-base">
                Total Price ({findTotalItem} items)
              </label>
              <span className="font-semibold text-green-500 text-sm md:text-base">
                ${actualPrice}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-600 text-sm md:text-base">
                Total discount
              </label>
              <span className="font-semibold text-red-500 text-sm md:text-base">
                {totalDiscount}%
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-gray-600 text-sm md:text-base">
                Delivery Charges
              </label>
              <label className="font-semibold text-sm md:text-base">
                <span className="line-through">$200</span> Free
              </label>
            </div>
            <hr />
            <div className="mt-4 flex justify-between items-center">
              <label className="text-gray-600 text-sm md:text-base">
                Discounted Price
              </label>
              <span className="font-semibold text-sm md:text-base">
                ${totalPrice}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <div>
            <img
              className="w-40 md:w-64"
              src="../../public/undraw_empty_cart_co35.svg"
              alt="Empty Cart"
            />
            <h1 className="mt-4 text-lg md:text-xl font-mono text-center">
              Cart is Empty
            </h1>
          </div>
          <div className="mt-5">
            <h2 className="text-gray-500 cursor-pointer font-semibold text-sm md:text-base">
              <Link to="/category">Add Product</Link>
            </h2>
          </div>
        </div>
      )}
    </>
  );
};
  