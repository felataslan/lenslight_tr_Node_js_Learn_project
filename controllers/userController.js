import User from "../models/userModel.js";
import bcrypt from 'bcrypt'

const createUser = async (req, res) => {
    // console.log('req Body', req.body)
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            succeded: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

};

const userLogin = async (req, res) => {
    // console.log('req Body', req.body)
    try {
        const { username, password } = req.body

        console.log('req.body',req.body);

        const user = await User.findOne({username})

        let same = false

        if (user) {
            same = await bcrypt.compare(password, user.password)
            console.log('Same:',same);


        } else {
          return  res.status(401).json({
                succeded: false,
                error: 'There is no such user',
            })
        }
        if (same) {
            res.status(200).send('your are loggend in')
        }
        else{
            res.status(500).json({
                succeded:false,
                error,
            })
        }


    } catch (error) {
        res.status(500).json({
            succeded: false,
            error
        })
    }

};

export { createUser,userLogin };