import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import "./PaymentComponent.css";

const CheckoutForm = ({ clientSecret, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentRequest, setPaymentRequest] = useState(null);

  useEffect(() => {
    if (stripe && paymentMethod === "upi") {
      const pr = stripe.paymentRequest({
        country: "IN",
        currency: "inr",
        total: {
          label: "Total",
          amount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0) * 100,
        },
        payment_method_types: ["upi"],
      });

      pr.canMakePayment().then((result) => {
        if (result) setPaymentRequest(pr);
      });
    }
  }, [stripe, paymentMethod, cart]);

  const handleCardSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    if (error) setMessage(`❌ ${error.message}`);
    else if (paymentIntent.status === "succeeded") {
      for (const item of cart) {
        await fetch(
          `http://localhost:8080/api/products/${item.id}/purchase?quantity=${item.quantity}`,
          { method: "POST" }
        );
      }
      setMessage("✅ Payment successful! Order placed.");
      localStorage.removeItem("checkoutCart"); // clear cart
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-box">
        <h2>Select Payment Method</h2>
        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="payment"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => setPaymentMethod("card")}
            />
            Card
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="upi"
              checked={paymentMethod === "upi"}
              onChange={() => setPaymentMethod("upi")}
            />
            UPI
          </label>
        </div>

        {paymentMethod === "card" && (
          <form onSubmit={handleCardSubmit} className="payment-form">
            <CardElement className="stripe-card-element" options={{ hidePostalCode: true }} />
            <button type="submit" className="payment-button" disabled={!stripe}>
              Pay Now
            </button>
          </form>
        )}

        {paymentMethod === "upi" && paymentRequest && (
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        )}

        {message && <p className="payment-message">{message}</p>}
      </div>
    </div>
  );
};

const PaymentComponent = () => {
  const location = useLocation();
  const { cart, totalAmount } = location.state || {};
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    setStripePromise(
      loadStripe("pk_test_51RzwxxR1vzl2TbaLiCQaC8ia6MGQhcyG8DjnjbnXWzBUHtx9aWdKbSmaIvwonqjZFHEA5apgx1yBD0Xs7ZRI0Ypl00Jjzy1lar")
    );

    fetch("http://localhost:8080/api/payment/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: Math.round(totalAmount * 100),
        currency: "inr",
      }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error(err));
  }, [totalAmount]);

  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm clientSecret={clientSecret} cart={cart} />
        </Elements>
      )}
    </div>
  );
};

export default PaymentComponent;
