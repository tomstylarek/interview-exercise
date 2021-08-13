const { Router } = require('express');
const router = Router();

let items = [
	{
		text: "Buy groceries",
		id: 1
	},
	{
		text: "Prepare report",
		id: 2
	},
	{
		text: "Read a book",
		id: 3
	}
];

// get items from the database
	// for now, I'm going to simulate it with a global array of item objects
router.get('/getItems', (req, res) => {
	

	res.send(items);
});

// add new item to the database and return the updated list of items
router.patch('/setNewItem', (req, res) => {
	
})

module.exports = router;