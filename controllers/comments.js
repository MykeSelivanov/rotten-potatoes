const Comment = require('../models/comment');

module.exports = (app, Comment) => {

    // Submit a new comment
    app.post('/reviews/comments', (req, res) => {
        res.send('reviews comment');
    });

}