import express from "express";
// import * as pageController from '../controllers/pageController.js'
import {getIndexPage,getAboutPage,getRegisterPage,getLoginPage,getLogout, getContactPage,sendMail} from '../controllers/pageController.js'
// import * as authMiddleware from '../middlewares/authMiddleware.js'




// All pages router with controller 
const router = express.Router();

router.route('/').get(getIndexPage);
router.route('/about').get(getAboutPage);
router.route('/register').get(getRegisterPage);
router.route('/login').get(getLoginPage);
router.route('/logout').get(getLogout);
router.route('/contact').get(getContactPage)
router.route('/contact').post(sendMail)



export default router;