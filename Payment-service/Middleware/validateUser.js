const jwt = require('jsonwebtoken')


const requireAuth = async (req, res, next) => {
    // verify user is authenticated
    console.log('Authorization header:', req.headers)
    const { authorization } = req.headers
    console.log('Authorization header:', authorization)

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1]

    try {
        const { _id } = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({ _id }).select('_id')
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth