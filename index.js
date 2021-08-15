const express = require('express');
const PORT = 3000;
const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});

// home route

app.get('/', (req, res) => {
	res.sendFile('/public/index.html', { root: __dirname })
});

app.use(require('./api/routes/todo-routes.js'));

// 404
app.use((req, res) => {
  res.status(404).send('Not Found');
})
