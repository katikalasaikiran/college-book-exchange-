import React, { useEffect, useState } from "react";
import axios from "axios";

// ✅ USE THE CLOUD URL
const API_URL =
  process.env.REACT_APP_API_URL || "https://college-book-api.onrender.com";

const Home = () => {
  const [books, setBooks] = useState([]);
  const user = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // ✅ Updated to use API_URL
        const { data } = await axios.get(`${API_URL}/api/books`);

        const sortedBooks = data.sort((a, b) => {
          return Number(a.isSold) - Number(b.isSold);
        });

        setBooks(sortedBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);

  const handleMarkAsSold = async (id) => {
    if (window.confirm("Are you sure you sold this book?")) {
      try {
        // ✅ Updated to use API_URL
        await axios.put(`${API_URL}/api/books/mark-sold/${id}`);

        setBooks((prevBooks) => {
          const updated = prevBooks.map((book) =>
            book._id === id ? { ...book, isSold: true } : book
          );
          return updated.sort((a, b) => Number(a.isSold) - Number(b.isSold));
        });
      } catch (error) {
        console.error("Error marking as sold:", error);
      }
    }
  };

  const handleContact = (phone, title) => {
    const message = `Hi, I am interested in buying your book: ${title}`;
    window.open(
      `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>
        📚 Available Books
      </h2>

      <div style={gridStyle}>
        {books.map((book) => {
          const isMyBook = user && book.seller && user._id === book.seller._id;

          return (
            <div
              key={book._id}
              style={{
                ...cardStyle,
                opacity: book.isSold ? 0.6 : 1,
                backgroundColor: book.isSold ? "#f0f0f0" : "white",
              }}
            >
              <img
                src={book.image || "https://via.placeholder.com/150"}
                alt={book.title}
                style={imageStyle}
              />

              <div style={{ padding: "15px" }}>
                <h3 style={{ margin: "0 0 10px" }}>{book.title}</h3>
                <p style={{ margin: "5px 0", color: "#7f8c8d" }}>
                  Author: {book.author}
                </p>
                <p
                  style={{
                    margin: "5px 0",
                    fontWeight: "bold",
                    color: "#27ae60",
                  }}
                >
                  Price: ₹{book.price}
                </p>
                <p style={{ fontSize: "0.8rem", color: "#95a5a6" }}>
                  Seller: {book.seller ? book.seller.name : "Unknown"}
                </p>

                {book.isSold ? (
                  <div style={soldBadgeStyle}>SOLD OUT ❌</div>
                ) : (
                  <>
                    <button
                      onClick={() =>
                        handleContact(book.contactPhone, book.title)
                      }
                      style={whatsappButtonStyle}
                    >
                      💬 Chat on WhatsApp
                    </button>

                    {isMyBook && (
                      <button
                        onClick={() => handleMarkAsSold(book._id)}
                        style={markSoldButtonStyle}
                      >
                        Mark as Sold ✅
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- STYLES ---
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  gap: "20px",
  padding: "20px",
};
const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  transition: "all 0.3s ease",
};
const imageStyle = {
  width: "100%",
  height: "200px",
  objectFit: "cover",
  backgroundColor: "#eee",
};
const whatsappButtonStyle = {
  width: "100%",
  padding: "10px",
  backgroundColor: "#25D366",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
  fontWeight: "bold",
};
const markSoldButtonStyle = {
  width: "100%",
  padding: "8px",
  backgroundColor: "#34495e",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  marginTop: "10px",
  fontSize: "0.9rem",
};
const soldBadgeStyle = {
  marginTop: "15px",
  padding: "10px",
  backgroundColor: "#e74c3c",
  color: "white",
  textAlign: "center",
  fontWeight: "bold",
  borderRadius: "5px",
};

export default Home;
