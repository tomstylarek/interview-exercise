const { v4: uuidv4 } = require('uuid');

let items = [];

const getItems = (req, res) => {
	res.send(items);
}

const setNewItem = (req, res) => {
	items.push({ text: req.query.text, id: uuidv4(), checked: false });

	res.send(items);
}

const editItem = (req, res) => {
	// find item and modify text
	items.forEach(item => {
		if (item.id === req.query.id) {
			item.text = req.query.text;
		}
	})

	res.send(items);
}

const removeItem = (req, res) => {
	items.forEach((item, index) => {
		if (item.id === req.query.id) {
			items.splice(index, 1);
		}
	})

	res.send(items);
}

module.exports = {
	getItems,
	setNewItem,
	editItem,
	removeItem
}