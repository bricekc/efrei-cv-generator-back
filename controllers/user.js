import CvModel from '../models/Cv.js';
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

  getUserCvs: async (req, res) => {
    const cvs = await CvModel.find({
      user: new mongoose.Types.ObjectId(req.user.id)
    });

    res.send(cvs);
  }
};
