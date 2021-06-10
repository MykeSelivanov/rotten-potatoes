const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = (app) => {
    // SIGN UP FORM
    app.get('/sign-up', (req, res) => 
    res.render('sign-up'));

    // CREATING NEW USER / SIGNUP
    app.post('/sign-up', (req, res) => {
        // Checking if username is already taken
        const { username, password } = req.body;
        User.findOne({ username }, 'username password' )
            .then((user) => {
                if(user) {
                    const message = `Hey "${user.username}" username already exists, please try another one`;
                    // User already exist
                    return res.render('sign-up', { message });
            } else {

                    // Create user of User model instance
                    const user = new User(req.body);
                    user.save()
                        .then((user) => { 
                            const token = jwt.sign({_id: user._id }, process.env.SECRET, { expiresIn: '10 days'});
                            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                            return res.redirect('/');
                        })
                        .catch(err => {
                            console.log(err.message);
                            return res.status(400).send({ err });
                        });
                    };
                });
    });

    app.get('/logout', (req, res) => {
        res.clearCookie('nToken');
        return res.redirect('/');
    });

    app.get('/login', (req, res) => {
        res.render('login');
    });

    // LOGIN
    app.post('/login', (req, res) => {
        const { username, password } = req.body;
        // Attempt to find user in DB
        User.findOne({ username }, 'username password' ) // , 'username password'  - you need this projection to filter the object after you get the query, to get only username and password
            .then((user) => {
                if(!user) {
                    // User does not exist
                    return res.status(401).send({ message: 'Wrong Username or Password' });
                }

                // Check the password
                user.comparePassword(password, (err, isMatch) => {
                    if (!isMatch) {
                      // Password does not match
                      return res.status(401).send({ message: 'Wrong Username or password' });
                    }

                // create token for user
                const token = jwt.sign({_id: user._id, username: user.username}, process.env.SECRET, { expiresIn: '10 days' });

                // Set cookie to result and redirect to root
                res.cookie('nToken', token, { maxAge: 900000, httpOnly: true});
                return res.redirect('/');
            });
    }).catch((err) => {
        console.log(err);
    });
});

}