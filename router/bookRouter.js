const express = require("express");
const { getAllBooks, addBook, updateBook, deleteBook } = require("../controller/bookController");

const router = express.Router();


router.get('/books', getAllBooks )

router.post('/add-book', addBook)

router.post('/update-book/:id', updateBook )

router.post('/delete-book/:id', deleteBook)


module.exports = router;