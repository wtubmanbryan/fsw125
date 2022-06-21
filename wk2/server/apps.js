const express = require('express');
const app = express();

const movies = [
   { id: 1, name: 'Die Hard'},
   { id: 2, name: 'Tatanic'},
   { id: 3, name: 'Ring of Fire'},
   { id: 4, name: 'From Paris with love'},
];

const actors = [
    { id: 1, name: 'John Travolta'},
    { id: 2, name: 'Bruce Willies'},
    { id: 3, name: 'Johnny Depp'},
    { id: 4, name: 'Mel Gibson'},
 ];

 const titles = [
    { id: 1, name: 'Batman'},
    { id: 2, name: 'Dr. Strange'},
    { id: 3, name: 'Lords of the Rings'},
    { id: 4, name: 'Wizard of Oz'},
 ];

app.get('/', (req, res) =>{
    res.send('<h1>Welcome to our Movie API</h1>')
});

app.get('/api/movies', (req, res) =>{
    res.send(movies);
});

//Get specific movie

app.get('/api/movies/:id', (req, res) =>{
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if(!movie) res.status(404).send('The movie with the given ID was not found');
    res.send(movie);
});

app.get('/api/actors', (req, res) =>{
    res.send(actors);
});

app.get('/api/actors/:id', (req, res) =>{
    const actor = actors.find(a => a.id === parseInt(req.params.id));
    if(!actor) res.status(404).send('The actor with the given ID was not found');
    res.send(actor);
});

app.get('/api/titles', (req, res) =>{
    res.send(titles);
});

app.get('/api/titles/:id', (req, res) =>{
    const title = titles.find(t => t.id === parseInt(req.params.id));
    if(!title) res.status(404).send('The title with the given ID was not found');
    res.send(title);
});

//PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to ${port}...`));



