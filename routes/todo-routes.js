const { Router } = require('express');
const router = Router();


let items = [];

// get items from the database
// for now, I'm going to simulate it with a global array of item objects
router.get('/getItems', (req, res) => {
	
	res.send(items);
});

// add new item to the database and response with the updated list of items
// again, for now I'm going to add the new item to the global array of items
router.patch('/setNewItem', (req, res) => {
	items.push({ text: req.query.text });
	
	res.send(items);
})

module.exports = router;