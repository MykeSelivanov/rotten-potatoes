// require libraries
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// middleware
var exphbs = require('express-handlebars');

// The following line must appear AFTER const app = express() and before routes
app.use(bodyParser.urlencoded({ extended: true }));

// set the templating engine -> handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// server connection with mongodb client
mongoose.connect('mongodb+srv://admin:Abc123@cluster0.hyums.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String
});

let reviews = [
    {title: "Great Reviews", movieTitle: "Botman II"},
    {title: "Awesome Movie", movieTitle: "Titanic"}
];

// get home route -> sending message
app.get('/', (req, res) => {
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

app.post('/reviews', (req, res) => {
    Review.create(req.body)
        .then((review) => {
            console.log(review);
            res.redirect('/');
        })
        .catch((err) => {
            console.log(err.message);
        });
    console.log(req.body.title);
})

// define app route
app.listen(3000, () => {
    console.log(`App listening on port 3000!`);
});