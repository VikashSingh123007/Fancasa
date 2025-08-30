import React, { useState, useEffect, useContext } from "react";
import "./CookieComponent.css";
import { AuthContext } from "../AuthContext/AuthProvider";

const CookieComponent = () => {
  const [visible, setVisible] = useState(false);
  const { user, loggedIn } = useContext(AuthContext);

  // Show banner if no consent stored locally
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) setVisible(true);
  }, []);

  // Sync localStorage consent to backend after login
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (loggedIn && user?.id && consent) {
      sendConsentToBackend(user.id, consent);
    }
  }, [loggedIn, user]);

  const sendConsentToBackend = async (userId, status) => {
    try {
      const response = await fetch("http://localhost:8080/api/cookies/consent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, consentStatus: status }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", response.status, errorText);
      } else {
        console.log("Consent synced with backend");
      }
    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const handleConsent = (status) => {
    localStorage.setItem("cookieConsent", status);

    if (loggedIn && user?.id) sendConsentToBackend(user.id, status);

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner fade-in">
      <p>We use cookies to enhance your experience. Accept or reject to continue.</p>
      <button onClick={() => handleConsent("ACCEPTED")}>Accept</button>
      <button onClick={() => handleConsent("REJECTED")}>Reject</button>
    </div>
  );
};

export default CookieComponent;
