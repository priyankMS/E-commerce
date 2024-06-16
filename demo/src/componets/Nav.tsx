// import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import { DownOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelectore } from "../redux/hook";

import React, { useContext, useRef, useEffect } from "react";
import { CartContext } from "../context/CartContex";
import SearchItem from "../pages/SearchItem";
import { logout } from "../redux/slice/AuthSlice";
import { isTokenExpired } from "../uitility/tokenUtility";

const Nav = () => {
  const login = useAppSelectore((state) => state.auth.isAuthentication);
  const dispatch = useAppDispatch();
  const navRef = useRef<HTMLDivElement>(null);

  const accessToken=  localStorage.getItem('access_token')
  const validateThistoken  =  isTokenExpired(accessToken)
  console.log(validateThistoken);
  
  const { cartProduct, resetCart } = useContext(CartContext);
  const userName = useAppSelectore((state) => state.auth.userName);

  const cartLength = cartProduct.length;
  const [toggle, setToggle] = React.useState(false);

  const items: MenuProps["items"] = [
    {
      label: <Link to="/userAccount">Account</Link>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">Billing</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <label
          className="cursor-pointer"
          onClick={() => {
            dispatch(logout());
            resetCart();
          }}
        >
          Logout
        </label>
      ),
      key: "3",
    },
  ];

  const toggleNavbar = () => {
    setToggle(!toggle);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(event.target as Node)) {
      setToggle(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className=" w-full  bg-gray-900 border-gray-200 dark:bg-gray-900" ref={navRef}>
      <button
          onClick={toggleNavbar}
          className="inline-flex items-center p-1 w-8 h-8 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={toggle ? "true" : "false"}
        >
          <span className="sr-only">Toggle navigation</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className={`w-full  sm:mb-0 flex-col md:block md:w-auto ${toggle ? "block" : "hidden"}`} id="navbar-default"> 
          <ul className=" flex flex-col  items-center md:flex-row  gap-3 ">
           <li>
              <NavLink to="/" className="block md:py-2   sm:mx-auto text-white  hover:text-gray-900 md:text-white  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white " onClick={toggleNavbar}>
                Home
              </NavLink>
            </li>
            {!login && (
              <>
                <li>
                  <NavLink to="/login" className="block md:py-2  text-white  hover:text-gray-900 md:text-white  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white " onClick={toggleNavbar}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" className="block md:py-2  text-white  hover:text-gray-900 md:text-white  rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white  " onClick={toggleNavbar}>
                    Signup
                  </NavLink>
                </li>
              </>
            )}
       </ul>
       </div>

       
 
        <div className={`w-full flex-col md:block md:w-auto ${toggle ? "block" : "hidden"}`} id="navbar-default">
         
          <div className="flex flex-col  md:flex-row gap-3 justify-center mt-1  items-center  md:mt-0">
           
            <div className="relative mr-5">
              <NavLink className="font-semibold ml-6  text-white" to="/cart">
                Cart
                <span className="ml-2">
                  <ShoppingCartOutlined />
                </span>
              </NavLink>
              {cartLength > 0 && (
                <span className="absolute top-0 right-0 md:top-0 md:right-0 bg-red-400 text-white rounded-full w-5 h-5 flex items-center justify-center">
                  {cartLength}
                </span>
              )}
            </div>

            <div className="cursor-pointer text-white">
            
              {login && (
                <Dropdown menu={{ items }} trigger={["click"]}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {login && <span>{userName}</span>}
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
              )}
            </div>

            <div className="ml-2">
              <SearchItem />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
