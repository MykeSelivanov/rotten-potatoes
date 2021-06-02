const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    title: String,
    movieTitle: String,
    description: String
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;