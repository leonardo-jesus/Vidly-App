const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Adventure'},
    {id: 3, name: 'Comedy'} 
]

// Get all the Genres
app.get('/genres', (req, res) => {
    return res.json(genres);
})

// Get one specific Genre by ID
app.get('/genres/:id', (req, res) => {
    id = req.params.id;
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if (genre == null) {
        return res.status(404).send('The given ID was not found at our database');
    } else {
        return res.json(genre);
    }
    
})

// Create a Genre
app.post('/genres', jsonParser, (req, res) => {
    body = req.body;
    if (!body.json) {
        return res.status(404).send('Use a JSON to add a new Genre')
    } else {
        genres.push(body);
        return res.json(body);
    }
})

// Update a Genre
app.patch('/genres/:id', jsonParser, (req, res) => {
    body = req.body;
    id = req.params.id;
    const genre = genres.find(g => g.id === parseInt(id));
    const index = genres.indexOf(genre);
    if (!body || id == null) {
        return res.status(404).send('The given ID was not found at our database')
    } else {
        genres[index] = body;
        return res.json(body);
    }
})

// Delete a Genre
app.delete('/genres/:id', (req, res) => {
    id = req.params.id;
    const genre = genres.find(g => g.id === parseInt(id))
    
    if (genre == null || id == null) {
        return res.status(404).send('The given ID was not found at our database');
    } else {
        const index = genres.indexOf(genre);
        genres.splice(index, 1);
        return res.json(genres);
    }
})


const port = process.env.PORT || 3000;
app.listen(port, console.log(`Server listening at Port ${port}`));