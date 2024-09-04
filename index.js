const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

const path = require('path');

app.use(express.static(path.join(__dirname, 'public'))); 
app.use(cors());

// Gets ALL NAMES OF CHURCHES in churchFinder -> churches
app.get('/api/get-all-churches-names', (req, res) => {
    pool.query('SELECT name FROM churches;', (err, results) => {
        if (err) {
            console.error('Error fetching church names:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json(results); // Access the actual data from the 'rows' property
        }
    });
} );

// Gets the DENOMINATION of a specified church
app.get('/api/get-church-denomination', (req, res) => {
    const churchName = req.query.name

    if (!churchName) {
        return res.status(400).json({ error: 'Missing church name' }); // Handle missing parameter
      }

    pool.query('SELECT denomination FROM churches WHERE name = ?;', [churchName], (err, results) => {
        if (err) {
            console.error(`Error fetching denomination for "${churchName}":`, err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.length === 0) {
              res.status(404).json({ error: 'Church not found' }); // Handle church not found
            } else {
                const denomination = results[0].denomination; // Extract the denomination value
                res.json({ denomination }); // Send the denomination as a JSON object
            }
        }
    });
});

// Gets the ADDRESS of a specified church
app.get('/api/get-church-address', (req, res) => {
    const churchName = req.query.name

    if (!churchName) {
        return res.status(400).json({ error: 'Missing church name' }); // Handle missing parameter
      }

    pool.query('SELECT address FROM churches WHERE name = ?;', [churchName], (err, results) => {
        if (err) {
            console.error(`Error fetching address for "${churchName}":`, err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.length === 0) {
              res.status(404).json({ error: 'Church not found' }); // Handle church not found
            } else {
                const address = results[0].address; // Extract the address value
                res.json({ address }); // Send the address as a JSON object
            }
        }
    });
});

// Gets the NAME of a specified church
app.get('/api/get-church-name', (req, res) => {
    const churchName = req.query.name

    if (!churchName) {
        return res.status(400).json({ error: 'Missing church name' }); // Handle missing parameter
      }

    pool.query('SELECT name FROM churches WHERE LOWER(name) = LOWER(?);', [churchName], (err, results) => {
        if (err) {
            console.error(`Error fetching name for "${churchName}":`, err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            if (results.length === 0) {
              res.status(404).json({ error: 'Church not found' }); // Handle church not found
            } else {
                const name = results[0].name; // Extract the name value
                res.json({ name }); // Send the name as a JSON object
            }
        }
    });
});

// Start the server
const port = 8000; 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // For some reason using backticks (`) instead of single quotes (') was important.
});
