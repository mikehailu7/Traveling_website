const express = require('express');
const reviewsController = require('../controllers/place_reviews/place_reviewcontroller');
const protectRoute = require('../controllers/auth/authenticatecont').protectRoute;
const { restrictRole, isReviewOwner } = require('../middlewares/credentialroute');

const reviewRouter = express.Router({ mergeParams: true });

reviewRouter
    .route('/')
    .get(protectRoute, reviewsController.getAllReviews)
    .post(protectRoute, restrictRole('user'), reviewsController.setProductAndUserId, reviewsController.createReview);

reviewRouter
    .route('/:id')
    .get(protectRoute, restrictRole('admin'), reviewsController.getReview)
    .patch(protectRoute, isReviewOwner({ admin: true }), reviewsController.updateReview)
    .delete(protectRoute, isReviewOwner({ admin: true }), reviewsController.deleteReview);


module.exports = reviewRouter;