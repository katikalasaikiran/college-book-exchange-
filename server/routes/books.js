const express = require("express");
const router = express.Router();
const Book = require("../models/Book");

// 1. GET ALL BOOKS
router.get("/", async (req, res) => {
  try {
    const books = await Book.find().populate("seller", "name");
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// 2. ADD A BOOK
router.post("/add", async (req, res) => {
  try {
    const {
      title,
      author,
      price,
      condition,
      description,
      contactPhone,
      image,
      seller,
    } = req.body;

    const newBook = new Book({
      title,
      author,
      price,
      condition,
      description,
      contactPhone,
      image,
      seller,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to add book" });
  }
});

// 3. MARK AS SOLD (This is the critical part!)
router.put("/mark-sold/:id", async (req, res) => {
  try {
    // Find the book and flip the switch to true
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      { isSold: true },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Marked as sold", book: updatedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Update failed" });
  }
});

module.exports = router;
