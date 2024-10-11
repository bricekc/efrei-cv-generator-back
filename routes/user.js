import express from 'express';
import userController from '../controllers/user.js';
import jwt from '../middlewares/jwt.js';

const app = express();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User API Endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         lastname:
 *           type: string
 *           description: The lastname of the user
 *         firstname:
 *           type: string
 *           description: The firstname of the user
 */

/**
 * @swagger
 * /api/user/me:
 *   get:
 *     summary: Get user informations
 *     tags: [User]
 *     responses:
 *       200:
 *         description: The user informations
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 */
app.get('/me', jwt.verifyUser, userController.getUserInfos);

/**
 * @swagger
 * /api/user/cvs:
 *   get:
 *     summary: Retrieve a list of cvs by user
 *     tags: [CVs]
 *     responses:
 *       200:
 *         description: A list of cvs by user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CV'
 */
app.get('/cvs', jwt.verifyUser, userController.getUserCvs);

export default app;
