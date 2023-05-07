const express = require('express')
//importing the controllers
const { userLogin, userSignUp } = require('./user_controller')

//define express router
const router = express.Router()

// attaching routes to the router
// Healthcheck
router.get('/healthcheck', (req, res) => {
    res.sendStatus(200)
})
// SignUp Route
router.post('/signup', userSignUp)
//Login Route
router.post('/login', userLogin)

module.exports = router