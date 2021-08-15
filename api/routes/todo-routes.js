const { Router } = require('express');
const router = Router();
const todoControllers = require('../controllers/todo-controllers.js');


// get items from the database
router.get('/getItems', todoControllers.getItems);
router.get('/getGroups', todoControllers.getGroups);
router.get('/getGroupItems', todoControllers.getGroupItems);

// add new item to the database and response with the updated list of items
router.post('/setNewItem', todoControllers.setNewItem);
router.post('/setNewGroup', todoControllers.setNewGroup);
router.post('/setNewGroupItem', todoControllers.setNewGroupItem);

// edit the item and response with the updated list of items
router.put('/editItem', todoControllers.editItem);
router.put('/editGroup', todoControllers.editGroup);
router.put('/editGroupItem', todoControllers.editGroupItem);

// remove item from the list and response with the updated list of items
router.delete('/removeItem', todoControllers.removeItem);
router.delete('/removeGroup', todoControllers.removeGroup);

router.put('/checkItem', todoControllers.checkItem);

module.exports = router;