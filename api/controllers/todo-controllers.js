const { v4: uuidv4 } = require('uuid');
const { Pool } = require('pg');

const pool = new Pool({
	host: 'localhost', // local database
	user: 'postgres', // default postgresql user
	password: 'todoapp', // password for this database is empty
	database: 'todoapp2'
});

let items = [];

const getItems = (req, res) => {
	pool.query('SELECT * FROM items WHERE group_id = 0')
		.then(response => {
			res.send(response.rows);	
		})
}

const getGroups = (req, res) => {
	pool.query('SELECT * FROM groups')
		.then(response => {
			res.send(response.rows);	
		})
}

const getGroupItems = (req, res) => {
	pool.query('SELECT * FROM items WHERE group_id = $1', [req.query.groupId])
		.then(response => {
			res.send(response.rows);	
		})
}

// set new item with groupId 0
const setNewItem = (req, res) => {
	pool.query('INSERT INTO items (description, checked, group_id) VALUES ($1, $2, $3)', [req.query.text, false, 0])
		.then(response => {
			res.status(200).end();
		});
}

const setNewGroup = (req, res) => {
	pool.query('INSERT INTO groups (name) VALUES ($1)', [req.query.name])
		.then(response => {
			res.status(200).end();
		});
}

const setNewGroupItem = (req, res) => {
	pool.query('INSERT INTO items (description, checked, group_id) VALUES ($1, $2, $3)', [req.query.text, false, req.query.groupId])
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

const editGroup = (req, res) => {
	pool.query('UPDATE groups SET name = $1 WHERE id = $2', [req.query.name, req.query.id])
		.then(response => {
			res.status(200).end();
		});
}

const editGroupItem = (req, res) => {
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

const removeGroup = (req, res) => {
	pool.query('DELETE FROM groups WHERE id = $1', [req.query.id])
		.then(response => {
			pool.query('DELETE FROM items WHERE group_id = $1', [req.query.id])
				.then(response => {
					res.status(200).end();
				})
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
	getGroups,
	getGroupItems,
	setNewItem,
	setNewGroup,
	setNewGroupItem,
	editItem,
	editGroup,
	editGroupItem,
	removeItem,
	removeGroup,
	checkItem
}