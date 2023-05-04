const User = require('./user_model')
const jwt = require('jsonwebtoken')

// getting the secret
const secret = process.env.SECRET
// creating the token
const createToken = (_id) => {
    return jwt.sign({_id}, secret, { expiresIn: '3d' }) //change to a month
}

// Signing up the user
const userSignUp = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Logging in the user
const userLogin = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


module.exports = {userSignUp, userLogin}