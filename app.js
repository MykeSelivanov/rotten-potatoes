// require libraries
const express = require('express');
const app = express();
const Handlebars = require('handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Initialize body-parser and add it to app
const bodyParser = require('body-parser');

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// middleware
var exphbs = require('express-handlebars');

// The following line must appear AFTER const app = express() and before routes
app.use(bodyParser.urlencoded({ extended: true }), methodOverride('_method'));

// set the templating engine -> handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main',
handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'handlebars');

// server connection with mongodb client
mongoose.connect('mongodb+srv://admin:Abc123@cluster0.hyums.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error:"));
const reviews = require("./controllers/reviews")(app);

// define app route
app.listen(3000, () => {
    console.log(`App listening on port 3000!`);
});