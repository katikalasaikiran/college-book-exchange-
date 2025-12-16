import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // 1. Get User Info from LocalStorage
  const user = JSON.parse(localStorage.getItem("userInfo"));

  // 2. Logout Function
  const handleLogout = () => {
    // Remove user data from storage
    localStorage.removeItem("userInfo");
    alert("Logged out successfully");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav style={navStyle}>
      {/* Left Side: Logo/Brand */}
      <h1 style={logoStyle}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          📖 College Bookstore
        </Link>
      </h1>

      {/* Right Side: Links & Profile */}
      <ul style={ulStyle}>
        <li>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>

        {/* --- CONDITIONAL RENDERING --- */}
        {user ? (
          // IF USER IS LOGGED IN: Show Add Book, Name, Logout
          <>
            <li>
              <Link to="/sell" style={linkStyle}>
                Sell a Book
              </Link>
            </li>

            {/* Profile Section */}
            <li style={profileContainerStyle}>
              <div style={avatarStyle}>
                {user.name.charAt(0).toUpperCase()} {/* First Letter of Name */}
              </div>
              <span style={{ color: "white", fontWeight: "bold" }}>
                {user.name}
              </span>
            </li>

            {/* Logout Button */}
            <li>
              <button onClick={handleLogout} style={logoutButtonStyle}>
                Logout
              </button>
            </li>
          </>
        ) : (
          // IF USER IS NOT LOGGED IN: Show Login/Register
          <>
            <li>
              <Link to="/login" style={linkStyle}>
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" style={linkStyle}>
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

// --- CSS STYLES ---
const navStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#2c3e50", // Dark Blue
  padding: "1rem 2rem",
  color: "white",
};

const logoStyle = {
  fontSize: "1.5rem",
  margin: 0,
};

const ulStyle = {
  display: "flex",
  alignItems: "center",
  listStyle: "none",
  margin: 0,
  padding: 0,
  gap: "20px", // Spacing between items
};

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontSize: "1.1rem",
  cursor: "pointer",
};

const profileContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: "5px 15px",
  borderRadius: "20px",
};

const avatarStyle = {
  width: "30px",
  height: "30px",
  backgroundColor: "#f1c40f", // Yellow circle
  color: "#2c3e50",
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
};

const logoutButtonStyle = {
  backgroundColor: "#e74c3c", // Red
  color: "white",
  border: "none",
  padding: "8px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Navbar;
