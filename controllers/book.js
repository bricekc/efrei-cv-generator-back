import BookModel from '../models/Book.js';
import UserModel from '../models/User.js';
import verifyBook from '../validator/book.js';

export default {
  create: async (req, res) => {
    try {
      verifyBook(req.body);
      let author = await UserModel.findById(req.body.author);
      if (!author) {
        res.status(400).send({ message: 'Author do not exist' });
      }
      const newBook = new BookModel({
        name: req.body.name,
        description: req.body.description,
        author
      });

      newBook.save();
      res.status(201).send({
        id: newBook._id,
        name: newBook.name,
        description: newBook.description,
        author: {
          id: newBook.author._id,
          firstname: newBook.author.firstname,
          lastname: newBook.author.lastname,
          email: newBook.author.email
        }
      });
    } catch (error) {
      res.status(400).send({
        message: error.message || 'ça va pas'
      });
    }
  },

  findAll: (req, res) => {
    BookModel.find()
      .then((books) => {
        res.send(books);
      })
      .catch((error) => {
        res.status(500).send({
          message: error.message
        });
      });
  },

  findBook: (req, res) => {
    const bookId = req.params.id;
    BookModel.findById(bookId)
      .then((book) => {
        res.send(book);
      })
      .catch((error) => {
        res.status(500).send(error.message || `Cannot find book with id=${bookId}`);
      });
  },

  updateBook: async (req, res) => {
    const bookId = req.params.id;
    const book = await BookModel.findById(bookId);
    if (!book) {
      throw new Error('Cannot find book to update');
    }
    const newBook = { ...book, ...req.body };

    verifyBook(req.body);
    const { name, description } = newBook;
    BookModel.findByIdAndUpdate(
      bookId,
      {
        name,
        description
      },
      { new: true }
    )
      .then((bookr) => {
        res.send(bookr);
      })
      .catch((error) => {
        res.status(500).sed(error.message || 'Something went wrong on update book');
      });
  },

  deleteBook: (req, res) => {
    const bookId = req.params.id;

    BookModel.findByIdAndDelete(bookId)
      .then(() => {
        res.send({ message: 'Book was successfully delete' });
      })
      .catch((error) => {
        res.status(500).send({ message: error.message || 'Error when deleting' });
      });
  }
};
