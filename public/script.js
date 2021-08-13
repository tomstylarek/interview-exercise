
const removeItem = () => {

}

// display form to edit the text of the item
const displayEditForm = (e) => {
	const form = document.createElement('form');
	const input = document.createElement('input');
	const btn = document.createElement('button');

	input.name = 'itemText';
	input.placeholder = 'Edit text';

	btn.addEventListener('click', () => {
		if (input.value) {
			const itemId = e.target.closest('li').dataset.id;
			editItem(itemId, input.value);
			document.body.removeChild(form);
		}
	});

	form.id = 'edit-form';
	form.appendChild(input);
	form.appendChild(btn);

	document.body.appendChild(form);
}

const editItem = (id, text) => {
	fetch(`/editItem?id=${id}&text=${text}`, { method: "PATCH" })
		.then(res => res.json())
		.then(data => {
			const todoList = document.getElementById("todo-list");
    		const newItems = getItems(data);
    		todoList.removeChild(document.getElementById('items'));
    		todoList.appendChild(newItems);
		})
}

const handleSubmit = (e) => {
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
}

const getItems = (data) => {
	const items = document.createElement('ul');
	items.id = "items";

	data.forEach(item => {
		const li = document.createElement('li');
		li.dataset.id = item.id;
		li.innerHTML = item.text;

		// creating edit button and adding listener for editing the item
		const editBtn = document.createElement('span');
		editBtn.innerHTML = '<img class="icon-img" src="./icons/editar.svg">';
		editBtn.addEventListener('click', displayEditForm);

		// creating remove button and adding listener for removing the item
		const removeBtn = document.createElement('span');
		removeBtn.innerHTML = '<img class="icon-img" src="./icons/basura.svg">';
		removeBtn.addEventListener('click', removeItem);

		// append to item
		li.appendChild(editBtn);
		li.appendChild(removeBtn);

		// append to item list
		items.appendChild(li);
	});

	return items;
}

const createForm = () => {
	const form = document.createElement('form');
	form.innerHTML = '<input name="itemText" placeholder="New item"><button>Add</button>';
	
	form.addEventListener('submit', handleSubmit);

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