import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken' 
import Photo from '../models/photoModel.js';


//Create user 
const createUser = async (req, res) => {
    // console.log('req Body', req.body)
    try {
        const user = await User.create(req.body);
        res.status(201).json({user:user._id,});
    } catch (error) {

        let errors2={};

        // console.log(error)
        if(error.code===11000){
            errors2.email = 'The Email is already registered';
        }

        if (error.name==='ValidationError') {
            Object.keys(error.errors).forEach((key)=>{
                errors2[key]=error.errors[key].message;
            })
        }

        console.log('Errors:',errors2);

        res.status(400).json(errors2)
    }

};

const userLogin = async (req, res) => {
    // console.log('req Body', req.body)
    try {
        const { username, password } = req.body

        // console.log('req.body',req.body);

        const user = await User.findOne({username})

        let same = false

        if (user) {
            same = await bcrypt.compare(password, user.password)
            // console.log('Same:',same);


        } else {
          return  res.status(401).json({
                succeded: false,
                error: 'There is no such user',
            })
        }
        if (same) {
            const token=createToken(user._id);
            res.cookie('jwt',token,{
                httpOnly:true,
                maxAge:1000*60*60*24,
            })
            res.redirect('/users/dashboard');
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

const createToken =(userId)=>{

return jwt.sign({userId},process.env.JWT_SECRET,{
    expiresIn:'1d',
});
};
const getDashboardPage = async (req, res) => {
    const photos = await Photo.find({ user: res.locals.user._id });
    const user = await User.findById({_id: res.locals.user._id}).populate([
        'followings', 
        'followers',   
    ])
    res.render('dashboard', {
      link: 'dashboard',
      photos,
      user,
    });
  };

//listed all photos here do it
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: res.locals.user._id}});
        res.status(200).render('users', {
            users,
            link: 'users',
        })
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

// get user photos here 
const getAUser = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });

        const inFollowers= user.followers.some((followers)=>{

            return followers.equals(res.locals.user._id)
        });

        const photos = await Photo.find({ user: user._id });
        res.status(200).render('user', {
            user,
            photos,
            link: 'users',
            inFollowers,
        });
    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}

// follow function
const follow = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            {_id: req.params.id },
            {
            $push:{followers:res.locals.user._id}
            },
            {
                new:true,
            }
        );

        user= await User.findByIdAndUpdate(
            {_id:res.locals.user._id},
            {$push:{followings: req.params.id}},
            {new:true},

        );
        res.status(200).redirect(`/users/${req.params.id}`)

    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}
// unfollow function
const unfollow = async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(
            {_id: req.params.id },
            {
            $pull:{followers:res.locals.user._id}
            },
            {
                new:true,
            }
        );

        user= await User.findByIdAndUpdate(
            {_id:res.locals.user._id},
            {$pull:{followings: req.params.id}},
            {new:true},

        );
        res.status(200).redirect(`/users/${req.params.id}`)


    } catch (error) {
        res.status(500).json({
            succeded: false,
            error,
        })
    }
}


export { createUser,userLogin,getDashboardPage,getAllUsers,getAUser,follow,unfollow };