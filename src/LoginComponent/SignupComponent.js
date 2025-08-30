import React, { useState } from "react";
import "./LoginComponent.css"; // reuse same styles

const SignupComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username and Password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Registration failed. Try another username.");
        return;
      }

      setSuccess("Account created successfully ✅ Please login.");
      setError("");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("Signup error:", err);
      setError("Something went wrong. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Sign Up</h1>

        <form onSubmit={handleSignup}>
          <label className="login-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="login-input"
            placeholder="Choose a username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="login-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="login-input"
            placeholder="Choose a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="login-error">{error}</p>}
          {success && <p className="login-success">{success}</p>}

          <button type="submit" className="login-btn">
            Register
          </button>
        </form>

        {/* 🔹 Back to Login link */}
        <p className="signup-text">
          Already have an account?{" "}
          <a href="/login" className="signup-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupComponent;
