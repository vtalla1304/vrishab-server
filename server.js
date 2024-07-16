const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Player = require('./models/player');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Add a player
app.post('/api/players', (req, res) => {
    const newPlayer = new Player(req.body);
    newPlayer.save()
        .then(player => res.json(player))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Update a player
app.put('/api/players/:id', (req, res) => {
    Player.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(player => res.json(player))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Delete a player
app.delete('/api/players/:id', (req, res) => {
    Player.findByIdAndDelete(req.params.id)
        .then(() => res.json({ success: true }))
        .catch(err => res.status(400).json({ error: err.message }));
});

// Perform queries
app.post('/api/players/query', (req, res) => {
    const { queryType, queryData } = req.body;
    switch (queryType) {
        case 'findByTeam':
            Player.find({ team: queryData.team })
                .then(players => res.json(players))
                .catch(err => res.status(400).json({ error: err.message }));
            break;
        case 'findByPosition':
            Player.find({ position: queryData.position })
                .then(players => res.json(players))
                .catch(err => res.status(400).json({ error: err.message }));
            break;
        case 'findByAge':
            Player.find({ age: queryData.age })
                .then(players => res.json(players))
                .catch(err => res.status(400).json({ error: err.message }));
            break;
        case 'findTopScorers':
            Player.find().sort({ goals: -1 }).limit(queryData.limit)
                .then(players => res.json(players))
                .catch(err => res.status(400).json({ error: err.message }));
            break;
        default:
            res.status(400).json({ error: 'Invalid query type' });
    }
});

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

module.exports = app;
