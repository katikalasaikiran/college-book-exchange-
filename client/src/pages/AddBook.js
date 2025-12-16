import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ USE THE CLOUD URL
const API_URL =
  process.env.REACT_APP_API_URL || "https://college-book-api.onrender.com";

const AddBook = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    condition: "Used - Good",
    description: "",
    contactPhone: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("userInfo");
    if (!storedUser) {
      alert("Please Login first!");
      return;
    }

    const userInfo = JSON.parse(storedUser);
    if (!userInfo.token) {
      alert("Session expired. Please logout and login again.");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      // ✅ Updated to use API_URL
      await axios.post(
        `${API_URL}/api/books/add`,
        {
          ...formData,
          seller: userInfo._id,
        },
        config
      );

      alert("Book listed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try logging out and logging in again.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "40px auto",
        padding: "20px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        borderRadius: "8px",
        backgroundColor: "#fff",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Sell Your Book</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="number"
          name="price"
          placeholder="Price (₹)"
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="condition"
          onChange={handleChange}
          style={inputStyle}
          value={formData.condition}
        >
          <option value="New">New</option>
          <option value="Used - Good">Used - Good</option>
          <option value="Used - Fair">Used - Fair</option>
          <option value="Old / Damaged">Old / Damaged</option>
        </select>

        <input
          type="text"
          name="contactPhone"
          placeholder="Phone Number (Required)"
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="text"
          name="image"
          placeholder="Image Link (URL)"
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="description"
          rows="3"
          placeholder="Description..."
          onChange={handleChange}
          style={inputStyle}
        ></textarea>

        <button type="submit" style={buttonStyle}>
          List Book Now 🚀
        </button>
      </form>
    </div>
  );
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};
const buttonStyle = {
  padding: "12px",
  backgroundColor: "#3498db",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default AddBook;
