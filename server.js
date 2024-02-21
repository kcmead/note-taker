// Importing necessary modules
const express = require('express');
const path = require('path');

// Importing routes from the 'routes' folder
const api = require('./routes/index');

// Creating an Express application
const app = express();

// Setting the port for the server, using process.env.PORT or defaulting to 3001
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static middleware pointing to the 'public' folder
app.use(express.static('public'));

// Routing middleware: Send all requests that begin with /api to the 'index.js' in the 'routes' folder
app.use('/api', api);

// GET route for the 'notes' page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

// Fallback route for when a user attempts to visit routes that don't exist
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
