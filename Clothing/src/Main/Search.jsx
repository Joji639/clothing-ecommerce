import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { Search as SearchIcon } from "lucide-react";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  // 🔹 Fetch products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("allproducts/products/");
        setProducts(res.data);
      } catch (error) {
        console.error("Search fetch error:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 Close mobile search when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Filter logic
  const filteredProducts = products.filter((p) =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      
      {/* ================= DESKTOP SEARCH ================= */}
      <div className="hidden lg:block w-full">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          className="w-full px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
        />

        {/* 🔽 DESKTOP RESULTS */}
        {open && searchTerm && filteredProducts.length > 0 && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-xl rounded-xl p-3 z-50 max-h-80 overflow-y-auto">
            {filteredProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`}>
                <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition">
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <p className="text-sm font-medium text-gray-700">
                    {p.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* ================= MOBILE / MD ================= */}
      <div className="lg:hidden">
        <button onClick={() => setOpen(!open)}>
          <SearchIcon size={22} />
        </button>

        {/* 🔽 MOBILE DROPDOWN */}
        {open && (
          <div
            className="absolute right-0 mt-2 bg-white shadow-xl rounded-xl p-3 z-50 w-64"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 🔍 INPUT */}
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded-md mb-2"
            />

            {/* 🔽 RESULTS */}
            {searchTerm && filteredProducts.length > 0 ? (
              <div className="max-h-60 overflow-y-auto">
                {filteredProducts.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`}>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <p className="text-sm font-medium text-gray-700">
                        {p.title}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              searchTerm && (
                <p className="text-sm text-gray-500">No products found</p>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;