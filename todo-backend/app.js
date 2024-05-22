/*
 * Name: TODO-App-Backend
 * Description: TODO-App-Backend with Node.js, Express, MongoDB
 * Author: Md. Samiur Rahman (Mukul)
 * Version: v1.0.0
 * Date: 14/6/2022
 * Last Modified: 14/6/2022
 *
 */

// imports modules & dependencies
const express = require("express");
const env = require("dotenv");
const favicon = require("serve-favicon");
const path = require("path");
const cors = require("cors");

// Import routes, middleware, and configs
const todos = require("./src/routes/todos.route");
const { notFoundRoute, errorHandler } = require("./src/configs/errorHandler");

// Load environment variables from .env file
env.config();

// Initialize express app
const app = express();

// Application database connection establishment
const connectDatabase = require("./src/db/connect");
connectDatabase();

// CORS setup - allow all origins
app.use(cors());

// Serve favicon
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Parse requests of content-type - application/json
app.use(express.json());

// Parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Default route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to TODO Node.js application backend." });
});

// Todos API routes
app.use(process.env.APP_API_PREFIX, todos);

// 404 - Not Found error handler
app.use(notFoundRoute);

// Error handler
app.use(errorHandler);

// App listens on a specified port (3001 in this case)
const PORT = process.env.APP_PORT || 3001;
const BASE_URL = process.env.APP_BASE_URL || `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`TODO-App backend server running on: ${BASE_URL}`);
});
