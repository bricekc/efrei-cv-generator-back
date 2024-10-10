import express from 'express';
import bookController from '../controllers/book.js';

const app = express();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The book ID
 *                   name:
 *                     type: string
 *                     description: The name of the book
 *       500:
 *         description: Server error
 */
app.get('/', bookController.findAll);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the book
 *               description:
 *                 type: string
 *                 description: The description of the book
 *               author:
 *                 type: string
 *                 description: The ID of the author
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The book ID
 *                 name:
 *                   type: string
 *                   description: The name of the book
 *                 description:
 *                   type: string
 *                   description: The description of the book
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The author ID
 *                     firstname:
 *                       type: string
 *                       description: The author's first name
 *                     lastname:
 *                       type: string
 *                       description: The author's last name
 *                     email:
 *                       type: string
 *                       description: The author's email
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
app.post('/', bookController.create);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the book to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The book details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The book ID
 *                 name:
 *                   type: string
 *                   description: The name of the book
 *                 description:
 *                   type: string
 *                   description: The description of the book
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The author ID
 *                     firstname:
 *                       type: string
 *                       description: The author's first name
 *                     lastname:
 *                       type: string
 *                       description: The author's last name
 *                     email:
 *                       type: string
 *                       description: The author's email
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
app.get('/:id', bookController.findBook);

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the book to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the book
 *               description:
 *                 type: string
 *                 description: The description of the book
 *               author:
 *                 type: string
 *                 description: The ID of the author
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The book ID
 *                 name:
 *                   type: string
 *                   description: The name of the book
 *                 description:
 *                   type: string
 *                   description: The description of the book
 *                 author:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The author ID
 *                     firstname:
 *                       type: string
 *                       description: The author's first name
 *                     lastname:
 *                       type: string
 *                       description: The author's last name
 *                     email:
 *                       type: string
 *                       description: The author's email
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
app.put('/:id', bookController.updateBook);

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the book to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Book was successfully deleted
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
app.delete('/:id', bookController.deleteBook);

export default app;
