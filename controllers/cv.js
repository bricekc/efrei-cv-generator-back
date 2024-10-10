import CVModel from '../models/Cv.js';
import UserModel from '../models/User.js';
import verifyCv from '../validator/cv.js';

export default {
  create: async (req, res) => {
    try {
      verifyCv(req.body);
      let user = await UserModel.findById(req.user).select('-password');
      const cv = new CVModel({
        name: req.body.name,
        description: req.body.description,
        user: user,
        educationalExperiences: req.body.educationalExperiences,
        professionalExperiences: req.body.professionalExperiences
      });
      await cv.save();
      res.status(201).send(cv)
    } catch (error) {
      res.status(500).send({ message: 'An error occurred while creating the Cv. ', error });
    }
  }
}