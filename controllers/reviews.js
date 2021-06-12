const Review = require('../models/review');
const Comment = require('../models/comment')
const User = require('../models/user');
const moment = require('moment');

module.exports = function (app) {

    // get home route -> sending message
    app.get('/', (req, res) => {

        // retrieve current user
        const currentUser = req.user;

        Review.find().lean().populate('author')
            .then(reviews => {
                res.render('reviews-index', { reviews: reviews, currentUser });
            })
            .catch(err => {
                console.log(err);
            });
    });

    app.get('/reviews/new', (req, res) => {
        // retrieve current user
        const currentUser = req.user;
        res.render('reviews-new', { title: "Post a review", currentUser });
    });
    
    // CREATE
    app.post('/reviews/new', (req, res) => {
            if (req.user) {
            const userId = req.user._id;
            const review = new Review(req.body);
            review.author = userId;

            review
                .save()
                .then(() => User.findById(userId))
                .then((user) => {
                user.reviews.unshift(review);
                user.save();
                // REDIRECT TO THE NEW review
                return res.redirect(`/reviews/${review._id}`);
                })
            .catch((err) => {
            console.log(err.message);
            });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });
    
    // GETTING SINGLE REVIEW
    app.get('/reviews/:id', (req, res) => {
        // retrieve current user
        const currentUser = req.user;

        Review.findById(req.params.id).lean().populate('comments').populate('author')
        .then(review => {
            // check if user requesting website is the review author
            if (currentUser === null) {
                var theAuthor = false;
            } else if (currentUser.username === review.author.username) {
                theAuthor = true;
            }
            
            let createdAt = review.createdAt;
            createdAt = moment(createdAt).format("MMMM Do YYYY, h:mm:ss");
            review.createdAt = createdAt;

            Comment.find({ reviewId: req.params.id })
                .then((comments) => {
                    res.render('reviews-show', { review, comments, currentUser, theAuthor });
                });
        })
        .catch(err => {
            console.log(err.message);
        });
    });
    
    // getting edit form
    app.get('/reviews/:id/edit', (req, res) => {
        // retrieve current user
        const currentUser = req.user;
        Review.findById(req.params.id, function (err, review) {
            res.render('reviews-edit', { review: review, title: "Edit review", currentUser });
        });
    });
    
    
    // logic for updating a review
    app.put('/reviews/:id', (req, res) => {
        Review.findByIdAndUpdate(req.params.id, req.body)
            .then(review => {
                res.redirect(`/reviews/${review._id}`);
            }).catch((err) => {
                console.log(err.message);
            });
    });
    
    // logic for deleting a review
    app.delete('/reviews/:id', function(req, res) {
        console.log('Delete review');
        Review.findByIdAndRemove(req.params.id)
        .then((review) => {
            console.log(`Successfully deleted: ${review}`);
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        });
    });

}