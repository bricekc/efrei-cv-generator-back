import express from 'express';
import cvController from '../controllers/cv.js';
import jwt from '../middlewares/jwt.js';
const app = express();

/**
 * @swagger
 * tags:
 *  name: CVs
 *  description: CV API Endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - rating
 *         - comment
 *       properties:
 *         rating:
 *           type: number
 *           description: The rating of the Review
 *         comment:
 *           type: string
 *           description: The comment of the Review
 *     CV:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the CV
 *         name:
 *           type: string
 *           description: The name of the CV
 *         description:
 *           type: string
 *           description: A brief description of the CV
 *         isPublic:
 *           type: boolean
 *           description: Visibility of the CV
 *         educationalExperiences:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/EducationalExperience'
 *         professionalExperiences:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProfessionalExperience'
 *     EducationalExperience:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the educational experience
 *         description:
 *           type: string
 *           description: The description of the educational experience
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the educational experience
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the educational experience
 *     ProfessionalExperience:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the professional experience
 *         description:
 *           type: string
 *           description: The description of the professional experience
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the professional experience
 *         endDate:
 *           type: string
 *           format: date
 *           description: The end date of the professional experience
 */

/**
 * @swagger
 * /api/cv:
 *   get:
 *     summary: Retrieve a list of cvs
 *     tags: [CVs]
 *     responses:
 *       200:
 *         description: A list of cvs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CV'
 */
app.get('/', cvController.findAll);

/**
 * @swagger
 * /api/cv/{id}:
 *   get:
 *     summary: Retrieve a single CV by ID
 *     tags: [CVs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     responses:
 *       200:
 *         description: The CV information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       404:
 *         description: CV not found
 */
app.get('/:id', cvController.findOne);

/**
 * @swagger
 * /api/cv:
 *   post:
 *     summary: Create a new CV
 *     tags: [CVs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       201:
 *         description: The created CV
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       401:
 *         description: Unauthorized
 */
app.post('/', jwt.verifyUser, cvController.create);

/**
 * @swagger
 * /api/cv/{id}:
 *   put:
 *     summary: Update an existing cv
 *     tags: [CVs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The CV ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CV'
 *     responses:
 *       200:
 *         description: The updated CV
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CV'
 *       403:
 *         description: Unauthorized user
 *       404:
 *         description: CV not found
 */
app.put('/:id', jwt.verifyUser, cvController.update);

/**
 * @swagger
 * /api/cv/{id}:
 *   delete:
 *     summary: Delete a CV by ID
 *     tags: [CVs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The CV ID
 *     responses:
 *       200:
 *         description: The deleted CV
 *       404:
 *         description: CV not found
 *       403:
 *         description: Unauthorized user
 */
app.delete('/:id', jwt.verifyUser, cvController.delete);

/**
 * @swagger
 * /api/cv/{id}/reviews:
 *   post:
 *     summary: Create a new review to cv
 *     tags: [CVs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: The created Review
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 *       401:
 *         description: Unauthorized
 */
app.post('/:id/reviews', jwt.verifyUser, cvController.addReview);
export default app;