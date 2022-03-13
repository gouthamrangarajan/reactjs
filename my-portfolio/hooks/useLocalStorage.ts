import { useEffect, useState } from "react";

const useLocalStorage=<T>(key:string):useLocalStorageRetType<T>=>{
   let [data,setData]=useState<T>();
   let updateData=(value:T)=>{
       setData(value);
   }
   useEffect(()=>{
    let dt=localStorage.getItem(key)
    if(dt){
        let jsonDt=JSON.parse(dt);
        setData(jsonDt);
    }
   },[setData])
   useEffect(()=>{    
    let oldData=localStorage.getItem(key)
    let allowSetData=false;
    if(oldData){
        let oldJsonData=JSON.parse(oldData);
        if(oldJsonData!==data)
            allowSetData=true;
    }
    else
        allowSetData=true;
    if(allowSetData && data)
        localStorage.setItem(key,JSON.stringify(data))
   },[data])
   return {data,updateData};
}
type useLocalStorageRetType<T> = {
    data:T|undefined;
    updateData:(val:T)=>void;
}
export default useLocalStorage;