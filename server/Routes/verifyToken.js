const jwt = require('jsonwebtoken')


const verify = (req,res,next)=>{
    const authheader = req.headers.token
    if(authheader){
        const token = authheader.split(' ')[1];
        jwt.verify(token,process.env.SECRET_KEY, (err,user)=>{
            if(err){
                res.status(403).json('invalid token')
            }
            req.user = user;
            next();
        })
    }else{
        res.status(401).json('you are not authenticated')
    }
}

module.exports = verify