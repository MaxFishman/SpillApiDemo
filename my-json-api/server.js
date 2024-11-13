const express = require('express');
const fs = require('fs');
const app = express();

// Load JSON data
const loadData = () => {
    const data = fs.readFileSync('SpillApiDemo/my-json-api/Spill.json');  // Replace 'data.json' with the path to your JSON file
    return JSON.parse(data);
};

// Define the API route
app.get('/api/data', (req, res) => {
    const data = loadData();
    res.json(data);
});

// Optional: Serve specific entries by ID
app.get('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const data = loadData();
    const entry = data.find(item => item['ID#'] === id);  // Replace 'ID#' with the actual key in your JSON
    if (entry) {
        res.json(entry);
    } else {
        res.status(404).json({ error: 'Not found' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});