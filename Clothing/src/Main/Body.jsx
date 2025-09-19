import React, { useEffect } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Cards from "../Components/Cards"
import { useState } from 'react';
import axios from 'axios';
import ProductCard from '../Components/ProductCart';
import toast from 'react-hot-toast';
const Body = () => {
const [Card,SetCard]=useState([])
useEffect(()=>{
 const FetchData=async()=>{
    try{
      const res= await axios.get("http://localhost:5000/cards")
      SetCard(res.data)
    }
    catch(error){
      console.error(error)
    }
  }
  FetchData();
  },[])
  const handleClick=()=>{
    toast.success("tasted")
  }
  return (
    <>
    
    <Nav/>
    <main className="bg-amber-400overflow-x-hidden">

      <section 
        className="relative h-64 bg-cover bg-center w-full max-w-full"
>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center ">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in">
              New Arrivals
            </h1>
            <p className="text-lg md:text-2xl mb-6 animate-fade-in delay-300">
              Refresh your wardrobe this season
            </p>
          </div>
        </div>
      </section>


      <section className="w-full h-96">
  <div className="w-full  h-full">
    <img 
      src="/src/assests/pexelssss.jpeg" 
      alt="Fashion showcase"
      className="w-full h-full object-cover"
    />
  </div>
</section>

    <Cards items={Card}/>

    </main>
    
    <Footer/>
    </>
  );
};

export default Body;

