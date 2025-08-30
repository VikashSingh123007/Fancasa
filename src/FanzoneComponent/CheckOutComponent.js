import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckOutComponent.css";

const CheckoutComponent = () => {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    setCart(storedCart);
    calculateTotal(storedCart);
  }, []);

  const calculateTotal = (cartItems) => {
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const updateCart = (productId, quantity) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
      .filter((item) => item.quantity > 0); // remove items with quantity 0
    setCart(updatedCart);
    localStorage.setItem("checkoutCart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  // New function to delete item from cart
  const deleteItem = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("checkoutCart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleCheckout = () => {
    navigate("/payment", { state: { cart, totalAmount } });
  };

  return (
    <div className="checkout-container">
      <h2>Cart</h2>
      {cart.length === 0 && <p>Your cart is empty.</p>}
      {cart.map((item) => (
        <div key={item.id} className="cart-item">
          <span>{item.name}</span>
          <span>Price: ${item.price}</span>
          <span>
            Qty:
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateCart(item.id, parseInt(e.target.value))}
            />
          </span>
          <span>Subtotal: ${item.price * item.quantity}</span>
          <button onClick={() => deleteItem(item.id)} className="delete-button">
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="checkout-summary">
          <h3>Total: ${totalAmount}</h3>
          <button onClick={handleCheckout} className="checkout-button">
            Confirm & Pay
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutComponent;
