// src/AuthContext/AuthProvider.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const AUTO_LOGOUT_DURATION = 60 * 60 * 1000; // 1 hour

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // ✅ Initialize login state
  useEffect(() => {
    const storedToken = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("userData");
    const loginTime = localStorage.getItem("loginTime");

    if (storedToken && storedUser && loginTime) {
      const elapsed = Date.now() - parseInt(loginTime, 10);

      if (elapsed < AUTO_LOGOUT_DURATION) {
        setLoggedIn(true);
        setToken(storedToken);

        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
        } catch (err) {
          console.error("Failed to parse stored user:", err);
          localStorage.removeItem("userData");
          setUser(null);
        }

        // auto logout after remaining time
        const timeout = setTimeout(() => logout(), AUTO_LOGOUT_DURATION - elapsed);
        return () => clearTimeout(timeout);
      } else {
        logout();
      }
    }
  }, []);

  // ✅ Login function
  const login = (jwtToken, userData) => {
    localStorage.setItem("userToken", jwtToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("loginTime", Date.now().toString());

    setLoggedIn(true);
    setUser(userData);
    setToken(jwtToken);

    setTimeout(() => logout(), AUTO_LOGOUT_DURATION);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("loginTime");

    setLoggedIn(false);
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
