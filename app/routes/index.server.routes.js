var express = require('express');
var router = express.Router();
const indexController = require('../controllers/index.server.controller')

/* GET home page. */
router.get('/', indexController.home);

/* GET home page. */
router.get('/home', indexController.home);

/* GET Project page. */
router.get('/projects', indexController.projects);

/* GET about page. */
router.get('/about', indexController.about);

/* GET services page. */
router.get('/services', indexController.services);

/* GET contact page. */
router.get('/contact', indexController.contact);

//displaying login Page
router.get('/login', indexController.displayLoginPage);

//processing login Page
router.post('/login', indexController.processLoginPage);

//displaying register Page
router.get('/register', indexController.displayRegisterPage);

//processing register Page
router.post('/register', indexController.processRegisterPage);

//performing the logout button
router.get('/logout', indexController.performLogout);

module.exports = router;

