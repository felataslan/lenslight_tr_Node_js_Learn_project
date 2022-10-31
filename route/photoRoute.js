import express from 'express'
import * as photoController from '../controllers/photoController.js'

const router =express.Router();


// router.route('/').post(photoController.createPhoto);
// router.route('/').get(photoController.getAllPhotos);

// firstly create photos and after get all photos and listed
router
.route('/')
.post(photoController.createPhoto)
.get(photoController.getAllPhotos);


// fetch photos by user id
router
.route('/:id')
.get(photoController.getAPhoto);


router
.route('/:id')
.delete(photoController.deletePhoto);


export default router;