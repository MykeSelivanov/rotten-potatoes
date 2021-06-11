const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const comments = require('../controllers/comments');
const should = chai.should();
const Comment = require('../models/comment');
const Review = require('../models/review');

const sampleReview = {
    "title": "This is Test Review",
    "movie-titile": "La La Test",
    "description": "A great test review of a great La La Test movie"
}

const sampleComment = {

}

chai.use(chaiHttp);

describe('Comments', () => {

    const testReview = new Review(sampleReview);
    const sampleComment = {
        "title": "This is test comment",
        "content": "This is content for the test comment",
        "reviewId": testReview.id
    }

    // Test Create comment
    it('should create a comment on /reviews/comments POST', (done) => {
        chai.request(server)
            .post('/reviews/comments')
            .set('content-type','application/x-www-form-urlencoded')
            .send(sampleComment)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // Test Delete comment
    it('should delete a single comment on /reviews/comments/:id DELETE', (done) => {
        const comment = new Comment(sampleComment);
        chai.request(server)
            .delete(`/reviews/${comment.id}?method=DELETE`)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })


});
