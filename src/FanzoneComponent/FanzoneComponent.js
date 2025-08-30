import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FanzoneComponent.css";

const FanzoneComponent = () => {
  const [products, setProducts] = useState([]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const navigate = useNavigate();

  // Function to check login dynamically
  const isLoggedIn = () => {
    const token = localStorage.getItem("userToken");
    return token !== null && token !== "";
  };

  // Fetch products on mount
  useEffect(() => {
    fetch("http://localhost:8080/api/products")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load products");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);

  const addToCart = (product) => {
    if (!isLoggedIn()) {
      setShowLoginPopup(true);
      return;
    }

    const currentCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    const existing = currentCart.find((item) => item.id === product.id);

    const updatedCart = existing
      ? currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      : [...currentCart, { ...product, quantity: 1 }];

    localStorage.setItem("checkoutCart", JSON.stringify(updatedCart));
  };

  const handleConfirmAndPay = () => {
    if (!isLoggedIn()) {
      setShowLoginPopup(true);
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="product-container">
      <h2 className="title">Available Products</h2>
      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.imageUrl} alt={p.name} className="product-image" />
            <h3>{p.name}</h3>
            <p>${p.price}</p>
            <div className="product-buttons">
              <button onClick={() => addToCart(p)}>Cart</button>
              <button onClick={handleConfirmAndPay} style={{ marginLeft: "8px" }}>
                Pay
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Login Popup */}
      {showLoginPopup && (
        <div className="login-popup">
          <div className="popup-content">
            <h3>⚠️ You need to log in first!</h3>
            <p>Please login to add products to cart or proceed to checkout.</p>
            <button onClick={() => setShowLoginPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FanzoneComponent;
