import User from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const authenticateToken = async (req, res, next) => {
    // const authHeader = req.headers['authorization']
    // // console.log('authHeader: ',authHeader)

    // const token = authHeader && authHeader.split(' ')[1];

    try {
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];

        // console.log('token',token);
    
        if(!token){
            return res.status(401).json({
                succeded:false,
                error:'no token available',    
            })
        }
        req.user=await User.findById(
            jwt.verify(token,process.env.JWT_SECRET).userId,
        );
    
        next();
    } catch (error) {
        res.status(401).json({
            succeded:false,
            error:'Not authorized',
        })

    }


}

export { authenticateToken }