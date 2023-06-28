const express = require('express');
const app = express();
const path = require('path');
const petsData = require('./data.json');

app.use(express.static(path.join(__dirname, 'public')));

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