const { Router } = require('express');
const router = Router();
const todoControllers = require('../controllers/todo-controllers.js');


// get items from the database
router.get('/getItems', todoControllers.getItems);

// add new item to the database and response with the updated list of items
router.post('/setNewItem', todoControllers.setNewItem);

// edit the item and response with the updated list of items
router.put('/editItem', todoControllers.editItem);

// remove item from the list and response with the updated list of items
router.delete('/removeItem', todoControllers.removeItem);

router.put('/checkItem', todoControllers.checkItem);

module.exports = router;