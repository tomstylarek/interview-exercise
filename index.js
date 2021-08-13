const express = require('express');
const PORT = 3000;
const app = express();

app.use(express.static('public'));

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// home route

app.get('/', (req, res) => {
	res.sendFile('/public/index.html', { root: __dirname })
});

app.use(require('./routes/todo-routes.js'));