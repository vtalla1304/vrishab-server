const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/yourDatabaseName', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Define a Mongoose model
const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Item = mongoose.model('Item', ItemSchema);

// API Endpoints
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/items', (req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => res.status(404).json({ noitemsfound: 'No items found' }));
});

app.post('/api/items', (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });

    newItem.save().then(item => res.json(item));
});

app.delete('/api/items/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ itemnotfound: 'No item found' }));
});

const server = app.listen(port, () => console.log(`Server running at http://localhost:${port}`));

module.exports = server;
