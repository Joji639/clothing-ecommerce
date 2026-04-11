import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import api from "../api/axios";

const Cards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await api.get(
          "allproducts/products/?bestseller=true"
        );

        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching bestseller products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  return (
    <>
      <h1 className="font-bold text-[40px] text-center mt-5">
        BEST SELLERS
      </h1>

      {loading ? (
        <p className="text-center mt-5">Loading...</p>
      ) : (
        <ProductCard pcard={products} />
      )}
    </>
  );
};

export default Cards;
