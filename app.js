// require libraries
const express = require('express');
const app = express();
const Handlebars = require('handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth');
require('dotenv').config();

// Initialize body-parser and add it to app
const bodyParser = require('body-parser');

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

// middleware
var exphbs = require('express-handlebars');

// The following line must appear AFTER const app = express() and before routes
app.use(bodyParser.urlencoded({ extended: true }), methodOverride('_method'));
// statis files
app.use(express.static('public'));
// middleware for parsing cookies
app.use(cookieParser());
// check authentication of user
app.use(checkAuth);

// set the templating engine -> handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main',
handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'handlebars');

// server connection with mongodb client
// const connectionString = `mongodb+srv://admin:Abc123@cluster0.hyums.mongodb.net/test`;
const connectionString = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.hyums.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, "MongoDB connection error:"));
const reviews = require("./controllers/reviews")(app);
const comments = require("./controllers/comments")(app);
require('./controllers/auth.js')(app);

// define app route
app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port ${process.env.PORT}!`);
});

module.exports = app;