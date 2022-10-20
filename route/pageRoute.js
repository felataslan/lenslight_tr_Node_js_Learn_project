import express from "express";
// import * as pageController from '../controllers/pageController.js'
import {getIndexPage,getAboutPage,getRegisterPage} from '../controllers/pageController.js'



const router = express.Router();

router.route('/').get(getIndexPage);
router.route('/about').get(getAboutPage);
router.route('/register').get(getRegisterPage);



export default router;