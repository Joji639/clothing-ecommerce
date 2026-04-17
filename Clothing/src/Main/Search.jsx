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

  // 🔹 Close mobile search when resizing
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 Filter + LIMIT results (important)
  const filteredProducts = products
    .filter((p) =>
      p.title?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div className="relative">
      
      {/* ================= DESKTOP SEARCH ================= */}
      <div className="hidden lg:block">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 200)}
          className="w-[400px] px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-2 focus:ring-amber-500 shadow-sm"
        />

        {/* 🔽 RESULTS */}
        {open && searchTerm && (
          <div className="absolute top-12 left-0 w-[400px] bg-white border border-gray-200 shadow-lg rounded-lg z-50 max-h-72 overflow-y-auto">
            
            {filteredProducts.length > 0 ? (
              <>
                {filteredProducts.map((p) => (
                  <Link key={p.id} to={`/product/${p.id}`}>
                    <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition">
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {p.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          ₹{p.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}

                {/* 🔥 View All */}
                <Link to={`/search?q=${searchTerm}`}>
                  <div className="text-center text-amber-600 text-sm py-2 hover:underline">
                    View all results
                  </div>
                </Link>
              </>
            ) : (
              <div className="p-3 text-sm text-gray-500">
                No products found
              </div>
            )}
          </div>
        )}
      </div>

      {/* ================= MOBILE SEARCH ================= */}
      <div className="lg:hidden">
        <button onClick={() => setOpen(!open)}>
          <SearchIcon size={22} />
        </button>

        {open && (
          <div
            className="absolute right-0 mt-2 bg-white border shadow-lg rounded-lg p-3 z-50 w-64"
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
            {searchTerm && (
              <div className="max-h-60 overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  <>
                    {filteredProducts.map((p) => (
                      <Link key={p.id} to={`/product/${p.id}`}>
                        <div className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg">
                          <img
                            src={p.img}
                            alt={p.title}
                            className="w-10 h-10 rounded-md object-cover"
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {p.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              ₹{p.price}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}

                    {/* 🔥 View All */}
                    <Link to={`/search?q=${searchTerm}`}>
                      <div className="text-center text-amber-600 text-sm py-2 hover:underline">
                        View all results
                      </div>
                    </Link>
                  </>
                ) : (
                  <p className="text-sm text-gray-500">
                    No products found
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;