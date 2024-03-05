import jwt from 'jsonwebtoken';

export const authorize = (req, res, next)=>{
    try {
        const payload = jwt.verify(req.headers.token, process.env.JWTPASS);
        if(payload.student_id == req.body.student_id) {
            next();
        } else {
            res.status(400).send('Not Allowed');
        }
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}

export const isTeacher = (req, res, next)=>{
    try {
        const {token} = req.headers;
        const payload = jwt.verify(token, process.env.JWTPASS);
        if(payload.isTeacher) {
            next();
        } else {
            res.status(400).send('You cannot verify answers');
        }
            
    } catch(err) {
        console.log(err);
        res.send(err);
    }
}