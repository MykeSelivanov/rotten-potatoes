const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: String,
    content: String,
    reviewId: {}
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;