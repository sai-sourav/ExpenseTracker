const express = require('express');

const usercontroller = require('../controllers/usercontroller');

const route = express.Router();

route.post('/:userid', usercontroller.editexpense);

route.use('/delete/:userid', usercontroller.deleteexpense);

route.get('/',usercontroller.getexpenses);

route.post('/',usercontroller.postexpense);

module.exports = route;