const { v4: uuidv4 } = require('uuid');

let items = [];

const getItems = (req, res) => {
	res.send(items);
}

const setNewItem = (req, res) => {
	items.push({ text: req.query.text, id: uuidv4() });

	res.send(items);
}

const editItem = (req, res) => {
	// find item and modify text
	items.forEach(item => {
		if (item.id === id) {
			item.text = req.query.text;
		}
	})

	return items;
}

module.exports = {
	getItems,
	setNewItem,
	editItem
}