import React, { useContext, useState, useEffect } from 'react';
import Nav from '../Main/Nav';
import ProductCard from './ProductCard';
import api from "../api/axios";
import { CategoryContext } from '../Context/CategoryContext';

const AllProducts = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const { Category } = useContext(CategoryContext);

  useEffect(() => {

    const fetchData = async () => {
      try {
        let url = "http://127.0.0.1:8000/allproducts/products/";

        
        if (Category) {
          url += `?category=${Category}`;
        }

        const res = await api.get(
          Category
            ? `allproducts/products/?category=${Category}`
            : "allproducts/products/");

        setProduct(res.data);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();

  }, [Category]);

  return (
    <>
      <Nav />

      <div>
        {loading ? (
          <div className="grid sm:grid-cols-1 lg:grid-cols-4 cursor-pointer gap-6 p-[50px] m-[10px]">

            {[...Array(8)].map((_, idx) => (
              <div
                key={idx}
                className="w-full relative shadow-md border-[1px] p-1 hover:shadow-lg transition hover:border-[2px] rounded-xl flex flex-col justify-center items-center"
              >
                <div className="absolute top-2 right-3">
                  <div className="h-6 w-6 bg-gray-300 rounded-full animate-pulse"></div>
                </div>

                <div className="flex flex-col justify-center items-center w-full">
                  <div className="h-48 w-full bg-gray-300 animate-pulse rounded-xl"></div>

                  <div className="grid gap-2 mt-2 text-center w-full px-2">
                    <div className="h-4 w-3/4 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="h-4 w-1/2 bg-gray-300 animate-pulse rounded-md"></div>
                    <div className="h-4 w-full bg-gray-300 animate-pulse rounded-md"></div>
                  </div>
                </div>
              </div>
            ))}

          </div>
        ) : (
          <ProductCard pcard={product} />   
        )}
      </div>
    </>
  );
};
export default AllProducts;