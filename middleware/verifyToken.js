const jwt=require("jsonwebtoken")

//verify token
function verifyToken(req,res,next){
    const token =req.headers.token

if(token){
try {
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    console.log(decoded)
    req.user=decoded
    next()
} catch (error) {
    res.status(401).json({message:"invalid token !"})
}
} else {
res.status(401).json({message:"no token provided !"})
}
}
//verify token && Authorize the user
function verifyTokenAndAuthrization(req,res,next){
verifyToken(req,res,()=>{
    if( req.user.id === req.params.id || req.user.isAdmin)
    {
    next()
    } else{
        res.status(403).json({message:"youare not allowed !"})
    }
})
}
//verify token && Admain
function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,()=>{
        if(req.user.isAdmin)
        {
        next()
        } else{
            res.status(403).json({message:"youare not allowed !,only admin"})
        }
    })
    }

module.exports={verifyToken,verifyTokenAndAuthrization,verifyTokenAndAdmin}