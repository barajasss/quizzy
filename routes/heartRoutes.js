const express = require('express')
const heartController = require('../controllers/heartController')

const router = express.Router()

router.get('/', heartController.getHearts)
router.put('/increment', heartController.increment)

module.exports = router
