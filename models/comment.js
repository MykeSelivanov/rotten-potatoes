const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const commentSchema = new Schema({
    title: String,
    content: String,
    reviewId: {type: Schema.Types.ObjectId, ref: 'Review'},
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;