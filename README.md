Description
This project is a Node.js application that utilizes Express to serve an API for managing diary entries, users, and authentication. It includes models for users, entries, and items, along with controllers to handle business logic and routers to define API routes.

Getting Started
Dependencies
Node.js
Express
bcryptjs for hashing passwords
dotenv for environment variable management
express-validator for request validation
jsonwebtoken (JWT) for authentication
A MySQL database setup with the required schema
Installing
Clone the repository to your local machine.
Install the required npm packages by running npm install in the project directory.
Configure your environment variables according to the .env.example file (you'll need to create a .env file with your specific settings).
Set up the MySQL database using the schema provided separately (Note: the schema is not included in the provided files).
Executing Program
To start the server, run:

Start dev server: `npm run dev` / `npm start`
The server will start on the default port 3000 (or another if specified in your .env file).

API Reference
Auth Routes
POST /api/auth/login - Logs in a user.
GET /api/auth/me - Retrieves the currently logged-in user's information.
User Routes
GET /api/users - Lists all users.
POST /api/users - Registers a new user.
GET /api/users/:id - Retrieves a user by ID.
PUT /api/users/:id - Updates a user's information.
DELETE /api/users/:id - Deletes a user.
Entry Routes
GET /api/entries - Retrieves all entries for the logged-in user.
POST /api/entries - Adds a new diary entry.
GET /api/entries/:id - Retrieves a diary entry by ID.
PUT /api/entries/:id - Updates a diary entry.
DELETE /api/entries/:id - Deletes a diary entry.

