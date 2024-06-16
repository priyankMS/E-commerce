import { useEffect, useState } from "react"


//this is debounce value when user type in input field it will wait for 500ms and then it will show the result  

export const useDebounce =  <T>(value:T,delay:number):T=>{
      const [debounceValue,setDebounceValue]= useState<T>(value)
      useEffect(()=>{
        const Timer = setTimeout(()=>{
            setDebounceValue(value)
        },delay)
        return ()=>clearTimeout(Timer)
      },[value,delay])
      return debounceValue
}