import CVModel from '../models/Cv.js';
import UserModel from '../models/User.js';
import ReviewModel from '../models/Review.js';
import verifyCv from '../validator/cv.js';
import verifyReview from '../validator/review.js';

export default {
  findAll: async (req, res) => {
    try {
      const cvs = await CVModel.find({ isPublic: true }).select('name description').populate('user', 'email');
      res.send(cvs);
    } catch (error) {
      res.status(500).send({
        message: error.message
      });
    }
  },
  findOne: async (req, res) => {
    try {
      const cv = await CVModel.findById(req.params.id)
        .populate('user', '_id email firstname lastname')
        .populate({
          path: 'reviews',
          populate: {
            path: 'user',
            select: '_id firstname lastname email'
          }
        });
      if (!cv) {
        res.status(404).send({ message: 'Cv not found' });
      }
      if (!cv.isPublic) {
        return res.status(403).send({ message: 'Cv is not public' });
      }
      res.send(cv);
    } catch (error) {
      res.status(500).send({
        message: error.message
      });
    }
  },
  create: async (req, res) => {
    try {
      verifyCv(req.body);
      let user = await UserModel.findById(req.user).select('-password');
      const cv = new CVModel({
        name: req.body.name,
        description: req.body.description,
        isPublic: req.body.isPublic,
        user: user,
        educationalExperiences: req.body.educationalExperiences,
        professionalExperiences: req.body.professionalExperiences
      });
      await cv.save();
      res.status(201).send(cv)
    } catch (error) {
      res.status(500).send({
        message: error.message
      });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const oldCv = await CVModel.findById(id);
      if (!oldCv) {
        return res.status(404).send({ message: 'Cv not found' });
      }
      verifyCv(req.body);
      CVModel.findByIdAndUpdate(id, { $set: req.body }, { new: true }).then(cv => {
        res.send(cv);
      }).catch(error => {
        res.status(500).send({
          message: error.message
        });
      });
    } catch (error) {
      res.status(500).send({
        message: error.message
      });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      const cv = await CVModel.findById(id);
      if (!cv) {
        return res.status(404).send({ message: 'Cv not found' });
      }
      const user = await UserModel.findById(req.user);
      if (user.id !== cv.user._id.toString()) {
        return res.status(403).send({ message: 'Unauthorized user' });
      }
      CVModel.deleteOne(id).then(() => {
        res.status(204).send('Cv deleted');
      }).catch(error => {
        res.status(500).send({
          message: error.message
        });
      });
    } catch (error) {
      res.status(500).send({
        message: error.message
      });
    }
  },
  addReview: async (req, res) => {
    try {
      const id = req.params.id;
      verifyReview(req.body);
      const { rating, comment } = req.body;
      if (!rating || !comment) {
        return res.status(400).json({ message: 'Please provide a rating and a comment.' });
      }
      const cv = await CVModel.findById(id);
      if (!cv) {
        return res.status(404).json({ message: 'CV not found.' });
      }
      let user = await UserModel.findById(req.user).select('-password');
      const review = new ReviewModel({
        rating,
        comment,
        user: user._id,
        cv: cv._id
      });
      await review.save(review)
      cv.reviews.push(review._id);
      await cv.save();
      res.status(201).send(cv)
    } catch (error) {
      res.status(500).send({
        message: error.message
      });
    }
  }

}