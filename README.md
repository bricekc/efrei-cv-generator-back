# Efrei CV Generator Back

## Description

This project is a backend service for a CV generator application. It provides APIs for user authentication, CV management, and review management.

The project is built with Node.js, Express.js, and MongoDB. The APIs are documented using Swagger.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Swagger
- bcrypt
- jsonschema
- dotenv
- cors
- docker

## Setup

1. Clone the repository
   ```bash
   git clone https://github.com/bricekc/efrei-cv-generator-back.git
   cd efrei-cv-generator-back
   ```

2. Install dependencies
   ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following environment variables
    ```bash
    DATABSE_URL=URL of the MongoDB database
    CORS_URL=http://localhost:3000
    ```
4. Start the server
   ```bash
   node app.js
   ```

5. Start mongodb with docker
   ```bash
   docker compose up --build
   ```

6. Access the API documentation at `http://localhost:3000/api-docs`