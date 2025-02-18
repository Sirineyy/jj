var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');

// Change the route to use POST instead of GET
router.post('/createUser', userController.createUser);
router.post('/createParent',userController.createParent);

module.exports = router;