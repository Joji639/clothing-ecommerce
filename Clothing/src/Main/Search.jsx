import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios"; // ✅ use your axios instance

const Search = ({ display = "block" }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  // ✅ Fetch from Django backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("allproducts/products/"); // 🔥 change if your endpoint differs
        setProducts(res.data);
      } catch (error) {
        console.error("Search fetch error:", error);
      }
    };

    fetchData();
  }, []);

  // ✅ Safe filtering
  const filteredProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`p-4 w-full flex ${display} ${
        display === "block" ? "md:hidden" : "md:block"
      }`}
    >
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border px-4 py-1 w-full rounded-full"
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
      />

      {/* 🔥 Search Results */}
      {open && searchTerm && filteredProducts.length > 0 && (
        <div className="absolute mt-10 bg-white w-full left-0 p-2 text-center shadow-2xl rounded-md grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 max-h-[400px] overflow-y-auto">

          {filteredProducts.map((p) => (
            <Link key={p.id} to={`/product/${p.id}`}>
              <div className="m-1 shadow-md hover:border hover:scale-[1.01] transition p-1 rounded-2xl">

                <div className="text-[13px] flex items-center gap-2">
                  <img
                    src={p.img}
                    alt={p.title}
                    width={50}
                    className="rounded-xl"
                  />

                  <div className="text-left">
                    <p>{p.title}</p>
                  </div>
                </div>

              </div>
            </Link>
          ))}

        </div>
      )}
    </div>
  );
};

export default Search;