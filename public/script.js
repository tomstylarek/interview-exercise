
// main list

const updateItems = () => {
	fetch('/getItems')
		.then(res => res.json())
		.then(data1 => {

			fetch('/getGroups')
				.then(res => res.json())
				.then(data2 => {
					const data = data1.concat(data2);
					const todoList = document.getElementById("todo-list");
		    		const newItems = getItems(data);

		    		todoList.removeChild(document.getElementById('items'));
		    		todoList.appendChild(newItems);
				})
		});
}

const updateGroupItems = (itemId, groupId) => {

	fetch(`/getGroupItems?groupId=${groupId}`)
		.then(res => res.json())
		.then(data => {
			if (document.getElementById('groupItems-' + groupId)) {
				document.getElementById('items').removeChild(document.getElementById('groupItems-' + groupId));
			}
			

			const list = getGroupItems(groupId, data);
			document.getElementById(itemId).insertAdjacentElement('afterend', list);
		})
}

const checkItem = (e) => {
	e.preventDefault();

	const itemId = e.target.closest('li').dataset.id;
	fetch(`/checkItem?id=${itemId}`, { method: "PUT"})
		.then(res => {

    		updateItems();
    		
    	});
}

const checkGroupItem = (e, itemId, groupId) => {
	e.preventDefault();

	const id = e.target.closest('li').dataset.id;
	fetch(`/checkItem?id=${id}`, { method: "PUT"})
		.then(res => {

    		updateGroupItems(itemId, groupId);
    		
    	});

}

const removeItem = (e) => {
	const itemId = e.target.closest('li').dataset.id;
	fetch(`/removeItem?id=${itemId}`, { method: "DELETE"})
		.then(res => {

    		updateItems();
    		
    	});
}

const removeGroupItem = (e, itemId, groupId) => {
	const id = e.target.closest('li').dataset.id;
	fetch(`/removeItem?id=${id}`, { method: "DELETE"})
		.then(res => {

    		updateGroupItems(itemId, groupId);
    		
    	});
}

const removeGroup = (e) => {
	const itemId = e.target.closest('li').dataset.id;
	fetch(`/removeGroup?id=${itemId}`, { method: "DELETE"})
		.then(res => {

    		updateItems();
    		
    	});
} 

const editItem = (id, text) => {
	if (text) {
		fetch(`/editItem?id=${id}&text=${text}`, { method: "PUT" })
			.then(res => {

	    		updateItems();
	    		
	    	});
	}
}

const editGroup = (id, name) => {
	if (name) {
			fetch(`/editGroup?id=${id}&name=${name}`, { method: "PUT" })
				.then(res => {

		    		updateItems();
		    		
		    	});
		}
}

const editGroupItem = (text, id, itemId, groupId) => {
	if (text) {
		fetch(`/editGroupItem?id=${id}&text=${text}`, { method: "PUT" })
			.then(res => {

	    		updateGroupItems(itemId, groupId);
	    		
	    	});
	}
}

const setNewItem = (text) => {

	if (text) {
		fetch(`/setNewItem?text=${text}`, {
	      method: 'POST',
	    })
    	.then(res => {

    		updateItems();
    	});
	}
	
}

const setNewGroup = (name) => {

	if (name) {
		fetch(`/setNewGroup?name=${name}`, {
	      method: 'POST',
	    })
    	.then(res => {

    		updateItems();
    		
    	});
	}
}

// display form to edit the text of the item
// handle edit name of group
const displayEditForm = (id, itemId, groupId, type) => {
	const form = document.createElement('form');
	const input = document.createElement('input');
	const editBtn = document.createElement('button');
	const cancelBtn = document.createElement('button');

	// remove current opened edit form, if any
	if (document.getElementById('edit-item-form')) {
		document.body.removeChild(document.getElementById('edit-item-form'));
	}

	form.classList.add('edit-item-form');
	form.id = 'edit-item-form';

	input.name = 'itemText';
	input.placeholder = 'Edit text';
	input.classList.add('edit-item-input');

	editBtn.textContent = 'Edit';
	cancelBtn.textContent = 'Cancel';
	editBtn.classList.add('edit-item-btn');
	cancelBtn.classList.add('edit-item-btn');

	editBtn.addEventListener('click', (e) => {
		e.preventDefault();
		if (input.value) {
			
			if (type === 'item') {
				editItem(itemId, input.value);
			} else if (type === 'group') {
				editGroup(itemId, input.value);
			} else {
				editGroupItem(input.value, id, itemId, groupId);
			}
			
			document.body.removeChild(form);
		}
	});

	cancelBtn.addEventListener('click', () => {
		document.body.removeChild(form);
	});

	form.appendChild(input);
	form.appendChild(editBtn);
	form.appendChild(cancelBtn);

	document.body.appendChild(form);
}

const displaySetForm = (itemId, groupId, type) => {
	const form = document.createElement('form');
	const formContainer = document.getElementById('form-container');
	const input = document.createElement('input');
	const setBtn = document.createElement('button');
	const cancelBtn = document.createElement('button');

	// remove current opened edit form, if any
	if (document.getElementById('set-form')) {
		formContainer.removeChild(document.getElementById('set-form'));
	}

	form.classList.add('set-form');
	form.id = 'set-form';

	if (type === 'item') {
		input.name = 'itemText';
		input.placeholder = 'Add item';
	} else if (type === 'group') {
		input.name = 'groupName';
		input.placeholder = 'Add group';
	} else {
		input.name = 'itemGroupText';
		input.placeholder = 'Add group item';
	}
	
	input.classList.add('set-input');

	setBtn.textContent = 'Add';
	cancelBtn.textContent = 'Cancel';
	setBtn.classList.add('set-btn');
	cancelBtn.classList.add('set-btn');

	setBtn.addEventListener('click', (e) => {
		e.preventDefault();
		if (input.value) {
			if (type === 'item') {
				setNewItem(input.value);
			} else if (type === 'group') {
				setNewGroup(input.value);
			} else {
				setNewGroupItem(input.value, itemId, groupId);
			}
			
			formContainer.removeChild(form);
		}
	});

	cancelBtn.addEventListener('click', () => {
		formContainer.removeChild(form);
	});

	form.appendChild(input);
	form.appendChild(setBtn);
	form.appendChild(cancelBtn);

	formContainer.appendChild(form);
}

// nested lists inside groups

const setNewGroupItem = (text, itemId, groupId) => {

	if (text) {
		fetch(`/setNewGroupItem?text=${text}&groupId=${groupId}`, {
	      method: 'POST',
	    })
    	.then(res => {

    		updateGroupItems(itemId, groupId);
    		
    	});
	}
}

const toggleItemList = (itemId, groupId) => {

	// if group has an opened nested list of items
	if (document.getElementById('groupItems-' + groupId)) {
	  	// remove nested list from element
	  	document.getElementById('items').removeChild(document.getElementById('groupItems-' + groupId));
	} else {

		fetch(`/getGroupItems?groupId=${groupId}`)
			.then(res => res.json())
			.then(data => {

				const list = getGroupItems(groupId, data);
	    
	    		document.getElementById(itemId).insertAdjacentElement('afterend', list);
			})
	    
	}
}

const getGroupItems = (groupId, data) => {
	const items = document.createElement('ul');
	items.id = "groupItems-" + groupId;
	items.classList.add('group-item-list')

	data.forEach(item => {
		const li = document.createElement('li');
		li.dataset.id = item.id;
		li.id = 'groupItem-' + item.id;
		li.classList.add('item');
		li.classList.add('group-item');

		// creating checkbox and adding listener for checked/unchecked state
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.addEventListener('click', (e) => {
			checkGroupItem(e, 'item-'+groupId, groupId)
		});
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
			displayEditForm(li.dataset.id, 'item-'+groupId, groupId, 'groupItem');
			
		});

		// creating remove button and adding listener for removing the item
		const removeBtn = document.createElement('span');
		removeBtn.innerHTML = '<img class="icon-img" src="./icons/basura.svg">';
		removeBtn.addEventListener('click', (e) => {
			// remove edit form, if any
			if (document.getElementById('edit-item-form')) {
				document.body.removeChild(document.getElementById('edit-item-form'));
			}

			removeGroupItem(e, 'item-'+groupId, groupId); // handle
		});

		const iconsContainer = document.createElement('div');
		iconsContainer.classList.add('icons');
		iconsContainer.appendChild(editBtn);
		iconsContainer.appendChild(removeBtn);

		// append to item
		li.appendChild(iconsContainer);

		// append to item list
		items.appendChild(li);
	});

	return items;
}

// create the item and group list with the concatenated data
const getItems = (data) => {
	const items = document.createElement('ul');
	items.id = "items";

	data.forEach(item => {
		const li = document.createElement('li');
		li.dataset.id = item.id;
		li.id = 'item-' + item.id;
		// setting the type of element: group or item
		li.dataset.type = item.hasOwnProperty('group_id') ? 'item' : 'group';
		const type = li.dataset.type;
		
		li.classList.add('item');
		if (type === 'group') {
			li.classList.add('group');
		}

		const checkbox = document.createElement('input');
		if (type === 'item') {
			// creating checkbox and adding listener for checked/unchecked state
			
			checkbox.type = 'checkbox';
			checkbox.addEventListener('click', checkItem);
			li.appendChild(checkbox);
		} else {
			// if it's a group, put a symbol to designate it
			li.innerHTML = '<img class="icon-img" src="./icons/carpeta.svg">';
		}
		
		
		// adding text
		const p = document.createElement('p');
		p.innerHTML = type === 'item' ? item.description : item.name;
		p.classList.add('item-text');
		if (type === 'item') {
			if (item.checked) {
				p.classList.add('checked');
				checkbox.checked = true;
			} else {
				p.classList.remove('checked');
				checkbox.checked = false;
			}
		} else {
			p.classList.add('group-name');
		}

		li.appendChild(p);

		const addBtn = document.createElement('span');
		// create add item button if it's a group
		if (type === 'group') {
			
			addBtn.textContent = '+';
			addBtn.classList.add('icon-img');
			addBtn.title = 'Add group item'
			addBtn.addEventListener('click', (e) => {
				const groupId = e.target.closest('li').dataset.id;
				displaySetForm(li.id, groupId, 'groupItem');
			});
		}


		// creating edit button and adding listener for editing the item
		const editBtn = document.createElement('span');
		editBtn.innerHTML = '<img class="icon-img" src="./icons/editar.svg">';
		editBtn.title = 'Edit';
		editBtn.addEventListener('click', () => {

			if (type === 'item') {
				displayEditForm(0, li.dataset.id, 0, 'item');
			} else {
				displayEditForm(0, li.dataset.id, 0, 'group');
			}
			
			
		});

		// creating remove button and adding listener for removing the item
		const removeBtn = document.createElement('span');
		removeBtn.innerHTML = '<img class="icon-img" src="./icons/basura.svg">';
		removeBtn.title = 'Remove';
		removeBtn.addEventListener('click', (e) => {
			// remove edit form, if any
			if (document.getElementById('edit-item-form')) {
				document.body.removeChild(document.getElementById('edit-item-form'));
			}

			if (type === 'item') {
				removeItem(e);				
			} else {
				removeGroup(e);
			}
		});

		const iconsContainer = document.createElement('div');
		iconsContainer.classList.add('icons');

		if (type === 'group') {
			iconsContainer.appendChild(addBtn);
		}
		iconsContainer.appendChild(editBtn);
		iconsContainer.appendChild(removeBtn);

		// append to item
		li.appendChild(iconsContainer);


		// listener to open acordion for group items
		if (type === 'group') {
			p.addEventListener('click', (e) => {
				toggleItemList(li.id, li.dataset.id);
			});
		}

		// append to item list
		items.appendChild(li);
	});

	return items;
}

window.addEventListener('load', () => {

	// fetch both the items and the groups, and concat all results in one array
	// display all
	fetch('/getItems')
		.then(res => res.json())
		.then(data1 => {

			fetch('/getGroups')
				.then(res => res.json())
				.then(data2 => {
					const data = data1.concat(data2);
					const todoList = document.getElementById("todo-list");
					const items = getItems(data);

					// add buttons for setting groups and items
					const formContainer = document.getElementById('form-container');
					const addItemBtn = document.createElement('button');
					const addGroupBtn = document.createElement('button');

					addItemBtn.innerHTML = '<img class="icon-img" src="./icons/to-do.svg">';
					addGroupBtn.innerHTML = '<img class="icon-img" src="./icons/carpeta.svg">';

					addItemBtn.classList.add('add-btn');
					addGroupBtn.classList.add('add-btn');

					addItemBtn.addEventListener('click', (e) => {
						displaySetForm(0, 0, 'item');
					})

					addGroupBtn.addEventListener('click', (e) => {
						displaySetForm(0, 0, 'group');
					})

					formContainer.appendChild(addItemBtn);
					formContainer.appendChild(addGroupBtn);

					// add item list
					todoList.appendChild(items);
				});

		});
})