import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const authenticateToken = async (req, res, next) => {
    // const authHeader = req.headers['authorization']
    // // console.log('authHeader: ',authHeader)

    // const token = authHeader && authHeader.split(' ')[1];

    try {
        const token = req.cookies.jwt;

        if(token){
            jwt.verify(token,process.env.JWT_SECRET,(err)=>{
                if(err){
                    console.log(err.message);
                    res.redirect('/login');
                }
                else{
                    next();
                }
            })
        }
        else{
            res.redirect('/login');
        }

    } catch (error) {
        res.status(401).json({
            succeded:false,
            error:'Not authorized',
        })

    }


}

export { authenticateToken }