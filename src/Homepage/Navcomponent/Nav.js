import React, { useContext } from "react";
import "./Nav.css";
import "@fontsource/faster-one"; 
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthProvider";

const Nav = () => {
  const { loggedIn, logout } = useContext(AuthContext); // use context
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();           // clear token and update context
    navigate("/");      // redirect to home
  };

  return (
    <nav className="nav">
      <h1 className="nav-logo">
        <Link className="Homelink" to="/">Fancasa</Link>
      </h1>

      <div className="nav-search">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input"
        />
      </div>

      <ul className="nav-links">
        <li><Link to="/news">News</Link></li>
        <li><Link to="/fanzone">Fanzone</Link></li>
        <li><Link to="/event">Events</Link></li>

        {loggedIn ? (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
