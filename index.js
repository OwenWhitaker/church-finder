const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

const path = require('path');

const testVariable = "Beans";
const churchList = ["Henderson Hills", "Life Church", "Wildwood", "Frontline", "First Baptist"]; //this list will be provided by the API

app.use(express.static(path.join(__dirname, 'public'))); 
app.use(cors());

app.get('/churches', (req, res) => {
    pool.query('SELECT * FROM churches', (err, results) => {
        if (err) {
            console.error('Error fetching churches:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results);
        }
    });
} );


// Endpoint to get list of churches to be displayed on list-view.html
app.get('/api/get-church-list', (req, res) => {
    res.json({ churches: churchList});
});

app.get('/api/get-variable', (req, res) => {    //  /api/get-variable   <-- my endpoint name
    res.json({ variableValue: testVariable});
});

// Start the server
const port = 8000; 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // For some reason using backticks (`) instead of single quotes (') was important.
});
