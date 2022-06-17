let express = require('express');
let router = express.Router();

// Connect to Business Contact Controller
let businessContactController = require('../controllers/business-contact');


/* GET Route for the Business Contact page - READ Operation */
router.get('/', businessContactController.displayContactList);

//displaying Add Page
router.get('/add',  businessContactController.displayAddPage);

//processing the Add Page
router.post('/add',  businessContactController.processAddPage);

//displaying Edit Page
router.get('/edit/:id',  businessContactController.displayEditPage);

//processing Edit Page
router.post('/edit/:id',  businessContactController.processEditPage);

//performing the Delete button
router.get('/delete/:id',  businessContactController.performDeleteContact);

module.exports = router