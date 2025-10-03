import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import Nav from '../Main/Nav'
import ProductCard from './ProductCard'
import axios from 'axios'
import { CategoryContext } from '../Context/CategoryContext'
import Skeleton from "@mui/material/Skeleton";
const AllProducts = () => {
  const [product,Setproduct]=useState([])
  const [loading,Setloading]=useState(true)
  const{Category}=useContext(CategoryContext)
  
  useEffect(()=>{

 const FetchData=async()=>{
    try{
      const res= await axios.get("http://localhost:5000/Products")
      setTimeout(() => {
          Setproduct(res.data);
          Setloading(false);
        }, 500);
    }
    catch(error){
      console.error(error)
    }
  }
  FetchData();
  },[Category])

  

  
  const filteredCategory=Category?(product.filter((p)=>p.category===Category)):product
  return (
    <>
    <Nav/>


    <div >
        {loading?
         <div className="grid sm:grid-cols-1 lg:grid-cols-4 cursor-pointer gap-6 p-[50px] m-[10px]">




 {[...Array(8)].map((_, idx) => (
    <div
      key={idx}
      className="w-full relative shadow-md border-[1px] p-1 hover:shadow-lg transition hover:border-[2px] rounded-xl flex flex-col justify-center items-center"
    >
      <div className="absolute top-2 right-3 text-black text-5xl">
        <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>
      </div>

      <div className="flex flex-col justify-center items-center overflow-hidden w-full">
        <div className="h-48 w-full bg-gray-300 animate-pulse rounded-xl"></div>

        <div className="grid gap-2 mt-2 text-center w-full px-2">
          <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-4 w-full bg-gray-300 animate-pulse rounded-md"></div>
        </div>
      </div>
    </div>
  ))}
</div>: 
            <ProductCard pcard={filteredCategory} />}
      </div>
    
    {/* <div>
      
      <ProductCard pcard={filteredCategory} />
    </div> */}
    </>
  )
}

export default AllProducts
