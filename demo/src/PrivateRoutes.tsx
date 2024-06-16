import { Outlet, useNavigate } from "react-router-dom";
import {  useAppSelectore } from "./redux/hook";
import { isTokenExpired } from "./uitility/tokenUtility";
import { useEffect } from "react";


const PrivateRoute = () => {
  const auth: boolean = useAppSelectore((state) => state.auth.isAuthentication);
  const accessToken: string | null = localStorage.getItem("access_token");
  const navigate =useNavigate()


  useEffect(() => {
    if (!auth || isTokenExpired(accessToken)) {
      console.log(isTokenExpired(accessToken));
      navigate("/login")
      window.location.reload()
    
    }
  }, [auth, accessToken,navigate]);
  return <Outlet />; 




};
export default PrivateRoute;
