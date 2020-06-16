const express = require('express')
const reviewController = require('../controllers/reviewController')
const router = express.Router()

router.post('/add', reviewController.addReview)
router.post('/update', reviewController.updateReview)

module.exports = router
