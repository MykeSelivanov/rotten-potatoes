const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const reviews = require('../controllers/reviews');
const should = chai.should();
const Review = require('../models/review');

const sampleReview = {
    "title": "This is Test Review",
    "movie-titile": "La La Test",
    "description": "A great test review of a great La La Test movie"
}

chai.use(chaiHttp);

describe('Reviews', () => {
    // Test Index
    it('should index ALL reviews on / GET', (done) => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });

    // Test New Review route
    it('should display posting new review form GET', (done) => {
        chai.request(server)
            .get('/reviews/new')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;

                // end the continuous loop
                done();
            });
    });

    // Test Create new Review and Detail page
    it('should create a review and show detail for it', async (done) => {
        Review.create(sampleReview).then((err, data) => {
            chai.request(server)
                .get(`/reviews/${data._id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
        done();
    });

    // Test Edit route
    it('should edit a review and go to edit it route', async (done) => {
        Review.create(sampleReview).then((err, data) => {
            chai.request(server)
                .get(`/reviews/${data._id}/edit`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.html
                    done();
                });
        });
        done();
    });


    // Clean up
    after(() => {
        Review.findOneAndRemove({title: 'This is Test Review'})
            .exec((err, reviews) => {
                console.log(reviews);
            });
    });

});

