import express from 'express'
import * as userController from '../controllers/userController.js'
import * as authMiddleware from '../middlewares/authMiddleware.js'
const router =express.Router();

//router register page
router
.route('/register')
.post(userController.createUser)

//router login page
router
.route('/login')
.post(userController.userLogin)

//router dashboardpage but firstly control token have or not
router
.route('/dashboard')
.get(authMiddleware.authenticateToken,userController.getDashboardPage)

//
router.route('/').get(authMiddleware.authenticateToken,userController.getAllUsers)

//
router.route('/:id').get(authMiddleware.authenticateToken,userController.getAUser)

router.route('/:id/follow').put(authMiddleware.authenticateToken,userController.follow);

router.route('/:id/unfollow').put(authMiddleware.authenticateToken,userController.unfollow);


export default router;