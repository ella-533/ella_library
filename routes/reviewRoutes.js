const express = require('express')
const router = express.Router()
const { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview } = require('../controllers/reviewControllers')
const { protect,restrict, restrictToOwnUser} = require('../controllers/authControllers')
const { Review } = require('../db/sequelizeSetup')
router
    .route('/')
    .get(findAllReviews)
    .post(protect, createReview)

router
    .route('/:id')
    .get(findReviewByPk)
    .put(protect, restrictToOwnUser(Review), updateReview)
    .delete(protect, restrict, restrictToOwnUser(Review), deleteReview)

module.exports = router