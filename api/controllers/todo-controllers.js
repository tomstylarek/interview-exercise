const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');

const pool = new Pool({
	host: 'localhost', // local database
	user: 'postgres', // default postgresql user
	password: 'todoapp', // password for this database is empty
	database: 'todoapp'
});

let items = [];

const getItems = (req, res) => {
	pool.query('SELECT * FROM items')
		.then(response => {
			res.send(response.rows);	
		})
}

const setNewItem = (req, res) => {
	pool.query('INSERT INTO items (description, checked) VALUES ($1, $2)', [req.query.text, false])
		.then(response => {
			res.status(200).end();
		});
}

const editItem = (req, res) => {
	pool.query('UPDATE items SET description = $1 WHERE id = $2', [req.query.text, req.query.id])
		.then(response => {
			res.status(200).end();
		});
}

const removeItem = (req, res) => {
	pool.query('DELETE FROM items WHERE id = $1', [req.query.id])
		.then(response => {
			res.status(200).end();
		});
}

const checkItem = (req, res) => {
	pool.query('UPDATE items SET checked = CASE WHEN checked = FALSE THEN TRUE ELSE FALSE END WHERE id = $1', [req.query.id])
		.then(response => {
			res.status(200).end();
		});
}

module.exports = {
	getItems,
	setNewItem,
	editItem,
	removeItem,
	checkItem
}