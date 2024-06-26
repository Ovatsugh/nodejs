const jwt = require('jsonwebtoken')
const getToken = require('./get-token')
///midlle to validation token 
const chechToken = async (req, res, next) => {

    if (!req.headers.authorization) {
       
        return res.status(401).json({ message: 'Acesso negado (primeiro if)!' })
    }
    const token = await getToken(req)

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado (segundo if)!' })
    }

    try {
       
        const verified = jwt.verify(token, 'nossosecret')
        req.user = verified
        next()
    } catch (error) {
        
        return res.status(400).json({ message: 'Token Inválido!' })
    }

}

module.exports = chechToken