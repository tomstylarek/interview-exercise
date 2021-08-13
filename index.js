const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// home route

app.get('/', (req, res) => {
	res.sendFile('/public/index.html', { root: __dirname })
});

app.use(require('./routes/todo-routes.js'));