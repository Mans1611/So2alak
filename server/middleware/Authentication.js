import jwt from "jsonwebtoken";

export const authenticate = (req, res, next)=>{
    try {
        const {token} = req.headers;
        if(!token) {
            return  res.status(400).send('Signing in is required');
        }
        jwt.verify(token, process.env.JWTPASS);
        next(); 
    } catch(err) {
        console.log(err);
        res.status(400).send(err);
    }
}