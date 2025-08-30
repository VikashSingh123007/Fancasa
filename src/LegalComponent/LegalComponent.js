// src/LegalComponent/LegalComponent.js
import React from "react";
import "./LegalComponent.css";

const LegalComponent = () => {
  return (
    <div className="legal-wrapper">
      <div className="legal-header">
        <h1>Legal Information</h1>
        <p>
          Welcome to <strong>Fancasa</strong>. Please review our{" "}
          <a href="#terms">Terms of Service</a> and{" "}
          <a href="#privacy">Privacy Policy</a>.
        </p>
      </div>

      {/* Terms of Service */}
      <section id="terms" className="legal-section">
        <h2>Terms of Service</h2>
        <ul>
          <li>
            Fancasa provides sports news, entertainment updates, and fan
            engagement features.
          </li>
          <li>
            You may not use this website for unlawful purposes, spamming, or
            distributing harmful content.
          </li>
          <li>
            Content provided is for informational purposes only. We do not
            guarantee accuracy of external links or third-party services.
          </li>
          <li>
            We reserve the right to update these terms at any time without prior
            notice.
          </li>
        </ul>
      </section>

      {/* Privacy Policy */}
      <section id="privacy" className="legal-section">
        <h2>Privacy Policy</h2>
        <ul>
          <li>
            We may collect basic user information such as name, email, and usage
            data when you interact with our site.
          </li>
          <li>
            We use cookies and analytics to improve your browsing experience and
            measure engagement.
          </li>
          <li>
            Your data will never be sold to third parties. It may only be shared
            with trusted services required to operate the website.
          </li>
          <li>
            You may request deletion of your account or data at any time by
            contacting us.
          </li>
        </ul>
      </section>

      <footer className="legal-footer">
        <p>
          For questions, contact us at{" "}
          <a href="mailto:support@fancasa.com">support@fancasa.com</a>.
        </p>
      </footer>
    </div>
  );
};

export default LegalComponent;
