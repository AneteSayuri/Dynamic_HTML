const express = require('express');
const app = express();
const path = require('path');
const petsData = require('./data.json');
const methodOverride = require('method-override');
const { v4: uuid } = require('uuid'); //For generating ID's

app.use(express.static(path.join(__dirname, 'public')));

// Views folder and EJS setup:
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


//http://localhost:3000/
app.get('/', (req, res) => {
    res.render('home');
})

//http://localhost:3000/others
app.get('/others', (req, res) => {
    const otherPets = ['Birds', 'Guinea Pigs', 'Horses', 'Rabbits', 'Reptiles', 'Furry Pets'];
    res.render('others', { otherPets });
})

// ****************
//    COMMENTS
// ****************

//To parse FORM data in POST request body:
app.use(express.urlencoded({ extended: true }));
// To parse incoming JSON in POST request body:
app.use(express.json());

// To 'fake' put/patch/delete requests:
app.use(methodOverride('_method'));

let comments = [
    {
        id: uuid(),
        username: 'Lilly',
        comment: 'I love my dog!'
    },
    {
        id: uuid(),
        username: 'Doggo',
        comment: 'Woof woof'
    }
]

// Show all comments
//http://localhost:3000/comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})

// Renders a form for New comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

// Create New comment
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments');
})

// Go to one particular comment
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
})

// Renders a form to Edit a comment
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
})

// Updates a particular comment
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    const newCommentText = req.body.comment;
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})

// Delete a single comment
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
})

//http://localhost:3000/:subtopic
app.get('/:subtopic', (req, res) => {
    const { subtopic } = req.params;
    const data = petsData[subtopic];
    if (data) {
        res.render('subtopic', { ...data });
    } else {
        res.render('notfound', { subtopic });
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})