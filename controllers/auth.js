const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    // SIGN UP FORM
    app.get('/sign-up', (req, res) => 
    res.render('sign-up'));

    // CREATING NEW USER / SIGNUP
    app.post('/sign-up', (req, res) => {
        // Create user of User model instance
        const user = new User(req.body);
        user.save()
            .then((user) => { 
                const token = jwt.sign({_id: user._id }, process.env.SECRET, { expiresIn: '60 days'});
                return res.redirect('/');
            })
            .catch(err => {
                console.log(err.message);
                return res.status(400).send({ err });
            });
    });
}