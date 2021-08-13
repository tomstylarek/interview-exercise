
const getItems = (data) => {
	const items = document.createElement('ul');
	items.id = "items";

	data.forEach(item => {
		const li = document.createElement('li');
		li.innerHTML = item.text;
		items.appendChild(li);
	});

	return items;
}

const createForm = () => {
	const form = document.createElement('form');
	form.innerHTML = '<input name="itemText" placeholder="New item"><button>Add</button>';
	
	form.addEventListener('submit', (e) => {
		e.preventDefault();

		fetch(`/setNewItem?text=${e.target.itemText.value}`, {
	      method: 'PATCH',
	    })
	    	.then(res => res.json())
	    	.then(data => {
	    		const todoList = document.getElementById("todo-list");
	    		const newItems = getItems(data);
	    		e.target.itemText.value = '';
	    		todoList.removeChild(document.getElementById('items'));
	    		todoList.appendChild(newItems);
	    	})
	})

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