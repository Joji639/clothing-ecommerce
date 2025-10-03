import axios from "axios"
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';



const Search = ({display="block"}) => {
  const[open,SetOpen]=useState(false)
 const [searchTerm, setSearchTerm] = useState("");
 const[product,SetProducts]=useState([])
 

  
useEffect(()=>{
    const FetchData= async()=>{
        try{
            const res= await axios.get('http://localhost:5000/Products')
            SetProducts(res.data)
        }
        catch(error){
            console.error(error)
        }
    }
    FetchData()
},[])

  const filteredProducts = product.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`p-4 mx-0 w-full  flex  ${display} ${display=="block"?"md:hidden":"md:block"} `}>
      
      
      <input
        type="text"
        placeholder={`Search products...`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`border px-4 py-1  w-full  rounded-full `}
        onFocus={()=>SetOpen(true)}
        // onFocus={() => setTimeout(() => SetOpen(true), 150)}
        onBlur={() => setTimeout(() => SetOpen(false), 250)}
      />

      
      {open && searchTerm && filteredProducts.length > 0 && (
  <div
    className={`absolute mt-10  bg-white w-full  left-0 p-2 text-center 
               shadow-2xl rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 
               gap-2 max-h-[400px] overflow-y-auto 
               `}>
    {filteredProducts.map((p) => (
      <div
        key={p.id}
        className="m-1 shadow-md hover:border-[1px] hover:scale-[1.01] transition-transform ease-in-out duration-250 p-1 rounded-2xl"
      >
          <Link to={`/product/${p.id}`}>
                    

        <div className="text-[13px] font-light flex  items-center gap-2 ">
          <img src={p.img} alt={p.title} width={50} className='rounded-xl'/>
          <ul className="flex flex-col justify-start text-left">
            <li>
              <p>{p.title}</p>
            </li>
          </ul>
        </div>
          </Link>
      </div>
    ))}
  </div>
 )}  

    </div>
  );
};


export default Search