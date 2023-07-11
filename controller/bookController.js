const BookModel = require('../model/book_schema');

const getAllBooks = async (req,res) => {
    let books;
    try {
        books = await BookModel.find({ status: 1 });
        // books = await BookModel.find();
        res.json({
            books: books
           })
    }
    catch (error) {
        console.log(error);
        throw new Error('Unable to restrieve books');
    }
}

const addBook = async (req,res) => {
    const data = req.body;

    
    const book = await  BookModel.create({
        title: data.title,
        author: data.author,
        release_year: data.release_year
      });
      res.json({
        books: book
       })
}

const updateBook = async (req,res) => {
    const data = req.body;

    const id = req.params.id;
    console.log(id);

    const updatedBook = await BookModel.findByIdAndUpdate(
        { _id: id },
        {
          title: data.title,
          author: data.author,
          release_year: data.release_year
        },
        { new: true }
      );
      res.json({
        book: updatedBook
       })
}

const deleteBook =  async (req, res) => {
    const data = req.body;

    const id = req.params.id;
    console.log(id);
    const deleteBook = await BookModel.findByIdAndUpdate(
        { _id: id },
        {
          status: 0
        },
        { new: true }
      );
      res.json({
        book: deleteBook
       })
}

module.exports = {getAllBooks, addBook,updateBook, deleteBook}