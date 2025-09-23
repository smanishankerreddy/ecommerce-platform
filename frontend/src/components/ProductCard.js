import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div style={styles.card}>
      <Link to={`/product/${product._id}`} style={styles.link}>
        <img src={product.image} alt={product.name} style={styles.image} />
        <h3>{product.name}</h3>
        <p>${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "1rem",
    margin: "1rem",
    width: "200px",
    textAlign: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    marginBottom: "0.5rem",
  },
  link: {
    textDecoration: "none",
    color: "#000",
  },
};

export default ProductCard;
