const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;
const app = express();
const db = require('./db');
const router = require('./routes');

// Middleware
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));
// cors
app.use((req, res, next) => {
    req.header('Access-Control-Allow-Origin', '*');
    req.header('Access-Control-Allow-Headers', '*');
    next();
});
// [PENDING] Add authentication middleware

// configure routers
// The idea is the same as in Java @RestControllers where the methods inherit the root path
// from the class and append their own path to it, yielding the path of the resource
app.use('/api', router);

// connect to MongoDB
db.connect();

// start server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});