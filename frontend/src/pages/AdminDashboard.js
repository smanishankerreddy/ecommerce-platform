import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch("http://localhost:5000/api/products");
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Admin Dashboard</h2>
      <h3>Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
      <button>Add New Product</button>
    </div>
  );
};

export default AdminDashboard;
