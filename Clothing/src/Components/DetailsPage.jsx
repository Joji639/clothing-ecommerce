import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../Main/Nav";
import api from "../api/axios";

const DetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`allproducts/products/${id}/`);

        setProduct(res.data);   

      } catch (err) {
        setError(err.message || "Error fetching product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  if (!product) return <p>No product found</p>;

  return (
    <>
      <Nav />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-10">
        
        
        <div>
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </div>

        
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold">{product.title}</h2>

          <p className="text-gray-500 mt-2 capitalize">
            Category: {product.category}
          </p>

          <p className="text-lg font-semibold mt-2">
            ₹{product.price}
          </p>

          {product.bestseller && (
            <p className="text-green-600 font-bold mt-2">
               Bestseller
            </p>
          )}

          <Link to="/paymentpage" state={{ product }}>
            <button className="mt-6 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700">
              Buy Now
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;