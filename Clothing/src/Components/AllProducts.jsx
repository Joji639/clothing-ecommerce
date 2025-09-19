import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import Nav from '../Main/Nav'
import ProductCard from './ProductCart'
import axios from 'axios'
import { CategoryContext } from '../Context/CategoryContext'
const AllProducts = () => {
  const [product,Setproduct]=useState([])
  useEffect(()=>{
 const FetchData=async()=>{
    try{
      const res= await axios.get("http://localhost:5000/Products")
       Setproduct(res.data)
    }
    catch(error){
      console.error(error)
    }
  }
  FetchData();
  },[])

  

  const{Category}=useContext(CategoryContext)
  const filteredCategory=Category?(product.filter((p)=>p.category===Category)):product

  return (
    <>
   <Nav/>
    <div>
      <ProductCard pcard={filteredCategory} />
    </div>
    </>
  )
}

export default AllProducts
