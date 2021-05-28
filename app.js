// require libraries
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// middleware
var exphbs = require('express-handlebars');

// set the templating engine -> handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// server connection with mongodb client
mongoose.connect('mongodb+srv://admin:Abc123@cluster0.hyums.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String
});

let reviews = [
    {title: "Great Reviews", movieTitle: "Botman II"},
    {title: "Awesome Movie", movieTitle: "Titanic"}
];

// get home route -> sending message
app.get('/reviews/new', (req, res) => {
    console.log(Review.find());
    Review.find()
        .then(reviews => {
            res.render('reviews-index', { reviews: reviews });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
});

// define app route
app.listen(3000, () => {
    console.log(`App listening on port 3000!`);
});