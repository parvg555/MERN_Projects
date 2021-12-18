import jsonwebtoken from "jsonwebtoken";

const auth = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).send({
        "status":"failed",
        "message":"Access-Denied"
    })

    try{

        const verified = jsonwebtoken.verify(token,process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    }catch(err){
        res.status(400).send({
            "status":"failed",
            "message":"Invalid Token"
        })
    }
}

export {
    auth as Authorizer
}