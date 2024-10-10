import UserModel from '../models/User.js';
import bcrypt from 'bcrypt';
import verifyUser from '../validator/user.js';
import jwt from 'jsonwebtoken';

export default {
  register: async (req, res) => {
    try {
      verifyUser(req.body);
      const { firstname, lastname, email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);

      const newUser = new UserModel({
        firstname,
        lastname,
        email,
        password: hash
      });

      newUser.save();
      res.status(201).send({
        id: newUser._id,
        lastname: newUser.lastname,
        firstname: newUser.firstname,
        email: newUser.email
      });
    } catch (error) {
      res.status(400).send({
        message: error.message || "ça va pas l'auth"
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email
    });

    if (!user) {
      res.status(401).send({
        message: 'User not exist'
      });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (checkPassword) {
      const jwtOption = {
        expiresIn: process.env.JWT_TIMEOUT_DURATION || '10h'
      };
      const secret = process.env.JWT_SECRET || 'secret';

      const token = jwt.sign({ userId: user.id }, secret, jwtOption);

      res.send({
        message: 'Login successfully',
        user: {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          token
        }
      });
    } else {
      res.status(401).send({
        message: 'Wrong login informations'
      });
    }
  }
};
