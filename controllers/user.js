import BookModel from '../models/Book.js';
import mongoose from 'mongoose';

export default {
  getUserInfos: (req, res) => {
    const { id, firstname, lastname, email } = req.user;
    res.send({
      id,
      firstname,
      lastname,
      email
    });
  },

  getUserBooks: async (req, res) => {
    const books = await BookModel.find({
      author: new mongoose.Types.ObjectId(req.user.id)
    });

    res.send(books);
  }
};
