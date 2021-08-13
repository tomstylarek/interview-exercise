const { Router } = require('express');
const router = Router();
const todoControllers = require('../controllers/todo-controllers.js');


// get items from the database
router.get('/getItems', todoControllers.getItems);

// add new item to the database and response with the updated list of items
router.patch('/setNewItem', todoControllers.setNewItem);

// edit the item and response with the updated list of items
router.patch('/editItem', todoControllers.editItem);

// remove item from the list and response with the updated list of items
router.patch('/removeItem', todoControllers.removeItem);

module.exports = router;