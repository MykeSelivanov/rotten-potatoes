// require libraries
const express = require('express');
const app = express();

// middleware
var exphbs = require('express-handlebars');

// set the templating engine -> handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

let reviews = [
    {title: "Great Reviews", movieTitle: "Botman II"},
    {title: "Awesome Movie", movieTitle: "Titanic"}
];

// get home route -> sending message
app.get('/', (req, res) => {
    res.render('reviews-index', { reviews: reviews });
});

// define app route
app.listen(3000, () => {
    console.log(`App listening on port 3000!`);
});