import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: null,
    title: "",
    img: "",
    category: "",
    price: "",
  });
  const [editingId, setEditingId] = useState(null); // track which product is being edited

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/Products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/Products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleAddOrUpdate = async () => {
    if (!newProduct.title || !newProduct.img || !newProduct.price || !newProduct.category) {
      alert("Please fill all fields");
      return;
    }

    try {
      if (editingId) {
        // update product (PUT requires full object with id)
        await axios.put(`http://localhost:5000/Products/${editingId}`, {
          ...newProduct,
          id: editingId,
        });
        setEditingId(null);
      } else {
        // add new product
        await axios.post("http://localhost:5000/Products", newProduct);
      }

      setNewProduct({ id: null, title: "", img: "", category: "", price: "" });
      fetchProducts();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEditClick = (product) => {
    setEditingId(product.id);
    setNewProduct({
      id: product.id,
      title: product.title,
      img: product.img,
      category: product.category,
      price: product.price,
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      {/* Add/Edit Product Form */}
      <div className="mb-6 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={newProduct.title}
          onChange={(e) =>
            setNewProduct({ ...newProduct, title: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 rounded"
          value={newProduct.img}
          onChange={(e) =>
            setNewProduct({ ...newProduct, img: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category"
          className="border p-2 rounded"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <button
          className={`${
            editingId ? "bg-blue-500" : "bg-green-500"
          } text-white px-4 rounded`}
          onClick={handleAddOrUpdate}
        >
          {editingId ? "Update" : "Add"}
        </button>
        {editingId && (
          <button
            className="bg-gray-500 text-white px-4 rounded"
            onClick={() => {
              setEditingId(null);
              setNewProduct({ id: null, title: "", img: "", category: "", price: "" });
            }}
          >
            Cancel
          </button>
        )}
      </div>

      {/* Products Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="text-center">
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">{p.title}</td>
              <td className="border p-2">
                <img
                  src={p.img}
                  alt={p.title}
                  className="w-12 h-12 object-cover mx-auto"
                />
              </td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">₹{p.price}</td>
              <td className="border p-7  flex justify-center gap-2">
                <button
                  className="border-[1px] text-black px-3 rounded hover:bg-blue-300"
                  onClick={() => handleEditClick(p)}
                >
                  Edit
                </button>
                <button
                  className="border-[1px] text-black px-3 rounded hover:bg-red-400"
                  onClick={() => handleDelete(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}  