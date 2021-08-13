
let items = [];

const getItems = (req, res) => {
	res.send(items);
}

const setNewItem = (req, res) => {
	items.push({ text: req.query.text });

	res.send(items);
}

module.exports = {
	getItems,
	setNewItem
}