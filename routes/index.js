const express = require('express');
const router = express.Router();
const AppController = require('../controllers/AppController');
const UserController = require('../controllers/UsersController');
const AuthController = require('../controllers/AuthController');

// GET

router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);
router.get('/users/me', UserController.getMe);
router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);

// Post

router.post('/users', UserController.postNew);

module.exports = router;
