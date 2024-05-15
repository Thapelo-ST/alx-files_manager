const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');
const FilesController = require('../controllers/FilesController');

// GET

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.get('/users/me', UserController.getMe);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);
router.get('/files/:id', FilesController.getShow);
router.get('/files', FilesController.getIndex);

// Post

router.post('/users', UserController.postNew);
router.post('/files', FilesController.postUpload);

// Put

router.put('/files/:id/publish', FilesController.putPublish);
router.put('/files/:id/unpublish', FilesController.putUnpublish);


module.exports = router;
