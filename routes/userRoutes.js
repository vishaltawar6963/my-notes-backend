const express = require('express')
const { registerUser, authUser, updateUser } = require('../controllers/userController')
const {protected} = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').post(registerUser)
router.route('/login').post(authUser)
router.route('/profile').post(protected,updateUser)


module.exports = router