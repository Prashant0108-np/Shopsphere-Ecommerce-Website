const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const connectDB = require('./config/db');
const router = require('./routes');

const app = express();

// Enable CORS with the frontend URL
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["POST", "GET"],
    credentials: true
}));;

// Middleware to parse JSON and cookies
app.use(express.json());
app.use(cookieParser());

// Root route to respond to GET requests at '/'
app.get('/', (req, res) => {
    res.send('Welcome to the ShopSphere API');
});

// Use your API routes
app.use("/api", router);

const PORT = process.env.PORT || 8080;

// Connect to the database and start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to DB`);
        console.log(`Server is running on port ${PORT}`);
    });
});

module.exports = app; // Export the app for testing or further use
