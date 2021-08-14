
const checkItem = (e) => {
	e.preventDefault();

	const itemId = e.target.closest('li').dataset.id;
	fetch(`/checkItem?id=${itemId}`, { method: "PATCH"})
		.then(res => res.json())
		.then(data => {
			const todoList = document.getElementById("todo-list");
    		const newItems = getItems(data);
    		todoList.removeChild(document.getElementById('items'));
    		todoList.appendChild(newItems);
		})
}

const removeItem = (e) => {
	const itemId = e.target.closest('li').dataset.id;
	fetch(`/removeItem?id=${itemId}`, { method: "PATCH"})
		.then(res => res.json())
		.then(data => {
			const todoList = document.getElementById("todo-list");
    		const newItems = getItems(data);
    		todoList.removeChild(document.getElementById('items'));
    		todoList.appendChild(newItems);
		})
}

// display form to edit the text of the item
const displayEditForm = (e) => {
	const form = document.createElement('form');
	const input = document.createElement('input');
	const editBtn = document.createElement('button');
	const cancelBtn = document.createElement('button');

	input.name = 'itemText';
	input.placeholder = 'Edit text';

	editBtn.textContent = 'Edit';
	cancelBtn.textContent = 'Cancel';

	editBtn.addEventListener('click', () => {
		if (input.value) {
			const itemId = e.target.closest('li').dataset.id;
			editItem(itemId, input.value);
			document.body.removeChild(form);
		}
	});

	cancelBtn.addEventListener('click', () => {
		document.body.removeChild(form);

		// unable set item input
		document.getElementById('set-item').disabled = false;
	});

	form.appendChild(input);
	form.appendChild(editBtn);
	form.appendChild(cancelBtn);

	document.body.appendChild(form);
}

const editItem = (id, text) => {
	if (e.target.itemText.value) {
		fetch(`/editItem?id=${id}&text=${text}`, { method: "PATCH" })
			.then(res => res.json())
			.then(data => {
				const todoList = document.getElementById("todo-list");
	    		const newItems = getItems(data);
	    		todoList.removeChild(document.getElementById('items'));
	    		todoList.appendChild(newItems);

	    		// unable set item input
	    		document.getElementById('set-item').disabled = false;
			})
	}
}

const handleSubmit = (e) => {
	e.preventDefault();

	if (e.target.itemText.value) {
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
    	});
	}
	
}

const getItems = (data) => {
	const items = document.createElement('ul');
	items.id = "items";

	data.forEach(item => {
		const li = document.createElement('li');
		li.dataset.id = item.id;
		li.classList.add('item');

		// creating checkbox and adding listener for checked/unchecked state
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.addEventListener('click', checkItem);
		li.appendChild(checkbox);
		
		// adding text
		const p = document.createElement('p');
		p.innerHTML = item.description;
		p.classList.add('item-text');
		if (item.checked) {
			p.classList.add('checked');
			checkbox.checked = true;
		} else {
			p.classList.remove('checked');
			checkbox.checked = false;
		}
		li.appendChild(p);

		// creating edit button and adding listener for editing the item
		const editBtn = document.createElement('span');
		editBtn.innerHTML = '<img class="icon-img" src="./icons/editar.svg">';
		editBtn.addEventListener('click', (e) => {
			// disable set item input
			document.getElementById('set-item').disabled = true;
			displayEditForm(e);
		});

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
	form.innerHTML = '<input id="set-item" name="itemText" placeholder="New item"><button>Add</button>';
	
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