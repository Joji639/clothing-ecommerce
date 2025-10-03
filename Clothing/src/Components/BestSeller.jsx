
 import axios from "axios"
import { useState,useEffect } from "react"
import AllProducts from "./AllProducts"
import { Link } from "react-router-dom"
import ProductCard from "./ProductCard"
const Cards = () => {
  const [Card,SetCard]=useState([])
useEffect(()=>{
 const FetchData=async()=>{
    try{
      const res= await axios.get("http://localhost:5000/Products")
      SetCard(res.data)
    }
    catch(error){
      console.error(error)
    }
  }
  FetchData();
  },[])
  console.log("Card",Card)
  const filtered=Card.filter((p)=>p.BestSeller=="true")
  console.log("filter",filtered)

  return (
    <>
    {/* <Link to="/AllProducts"> */}
    <h1 className="font-bold text-[50px] text-center mt-3 ">BEST SELLERS</h1>
    <ProductCard pcard={filtered}/>
      {/* </Link> */}
      </>
  )
}

export default Cards
