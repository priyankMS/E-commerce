
import { useSelector,useDispatch } from "react-redux";
import type { RootState,AppDispatch } from "./store";



export const useAppSelectore =  useSelector.withTypes<RootState>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()