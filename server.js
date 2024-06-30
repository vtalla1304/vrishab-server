const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/endpoint1', (req, res) => res.send('This is endpoint 1'));
app.get('/api/endpoint2', (req, res) => res.send('This is endpoint 2'));
app.get('/api/endpoint3', (req, res) => res.send('This is endpoint 3'));
app.get('/api/endpoint4', (req, res) => res.send('This is endpoint 4'));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
