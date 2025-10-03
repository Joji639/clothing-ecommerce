import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Nav from "../Main/Nav";
import { useCart } from "../Context/CartContext";

const DetailsPage = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {AddToCart,CartItem}=useCart()
    
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/Products/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <>
    <Nav/>
    <div className="grid grid-cols-2 h-screen p-5 ">
        <div className="p-3">
      <img src={product.img} alt={product.title} className="w-full h-full object-cover rounded-lg" />

        </div>
    <div className="w-full h-full flex flex-col justify-center  items-center p-6">
        
      <h2 className="text-2xl font-bold mt-4">{product.title}</h2>
      <p className="text-gray-500 capitalize">{product.category}</p>
      <p className="text-lg font-semibold mt-2">₹{product.price}</p>
     {CartItem.find((p) => p.id === product.id) ? (
                         <Link to={"/Carts"}>
                         <button className="bg-blue-500 p-3 rounded-lg hover:bg-blue-600 w-full mb-1 border-[1px] cursor-pointer transition-all ease-in-out">
                           VIEW CART
                         </button>
                         </Link>
                      
                     ) : (
                         <button
                           onClick={(e) => {
                             e.stopPropagation(); 
                             AddToCart(product);
                           }}
                           className="bg-blue-500 p-3 rounded-lg hover:bg-blue-600  mb-1 border-[1px] cursor-pointer transition-all ease-in-out"
                         >
                           ADD TO CART
                         </button>
                     )}

      <Link to={`/paymentpage`} state={{product: {...product,quantity:1}}}>
      <button className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700" >
        Buy Now
      </button>
      </Link>
      
    </div>
    </div>
    </>
  );
};

export default DetailsPage;
