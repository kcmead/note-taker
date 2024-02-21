// Importing necessary modules
const router = require('express').Router();
const uniqid = require('uniqid');
const { readFromFile, readAndAppend, readAndDelete } = require('../helpers/fsUtils.js');

// GET route for getting data from the 'db.json' file
router.get('/notes', (req, res) => {
    // Reading data from the file and sending it as JSON response
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))).catch(() => res.json([]));
});

// POST route for adding a new note to the 'db.json' file
router.post('/notes', (req, res) => {
    // Extracting title and text from the request body
    const { title, text } = req.body;

    // Checking if the request body is not empty
    if (req.body) {
        // Creating a new note object with a unique id
        const newNote = {
            title,
            text,
            id: uniqid(),
        };

        // Appending the new note to the 'db.json' file
        readAndAppend(newNote, './db/db.json');

        // Sending a success response
        res.json('Note added successfully');
    } else {
        // Sending an error response if the request body is empty
        res.json('Error in adding note');
    }
});

// DELETE route for deleting a note from the 'db.json' file
router.delete('/notes/:id', (req, res) => {
    // Checking if the request params contain an 'id'
    if (req.params.id) {
        // Deleting the note with the specified 'id' from the 'db.json' file
        readAndDelete(req.params.id, './db/db.json');

        // Sending a success response
        res.json('Note deleted successfully');
    } else {
        // Sending an error response if 'id' is not provided in the request params
        res.json('Error in deleting note');
    }
});

// Exporting the router for use in other files
module.exports = router;
