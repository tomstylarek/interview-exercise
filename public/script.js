
const getItems = (data) => {
	const items = document.createElement('ul');

	data.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = item.text;
		items.appendChild(li);
	});

	return items;
}

const createForm = () => {
	const form = document.createElement('form');
	form.innerHTML = '<input placeholder="New item"><button type="submit">Add</button>';
	form.action = '/setNewItem';
	form.method = 'PATCH';

	return form;
}

window.addEventListener('load', () => {

	fetch('/getItems')
		.then(res => res.json())
		.then(data => {
			const todoList = document.getElementById("todo-list");
			const items = getItems(data);
			const form = createForm();

			todoList.appendChild(items);
			todoList.appendChild(form);
		})
})