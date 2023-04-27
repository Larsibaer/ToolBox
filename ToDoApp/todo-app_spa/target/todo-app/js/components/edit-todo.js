import util from '../util.js';
import service from '../service.js';
import router from '../router.js';
import store from '../store.js';

export default {
	requiresAuth: true,

	getTitle: function() {
		return "Edit Todo";
	},

	render: function(id) {
		if (!id) {
			return util.createNodeFromHTML('<p class="message danger">Invalid parameter! Id missing!</p>');
		}
		const todo = store.getTodo(id);
		if (!todo) {
			return util.createNodeFromHTML('<p class="message danger">Invalid parameter! Id is not a valid todo id!</p>');
		}
		return util.loadTemplate('edit-todo', view => initView(view, todo));
	}
};

function initView(view, todo) {

	const form = view.querySelector('form');
	form.title.value = todo.title;
	form.category.value = todo.category;
	form.date.value = todo.dueDate;

	view.querySelector('[data-action=save]').addEventListener('click', e => {
		e.preventDefault();
		const updatedTodo = {...todo, ...getFormData()};
		service.putTodo(store.getUser(), updatedTodo)
			.then(() => {
				store.removeTodo(todo.id);
				store.addTodo(updatedTodo);
				router.navigate('/todos')
			})
			.catch(() => view.querySelector('[data-field=error]').innerHTML = "Updating todo failed!");
	});

	view.querySelector('[data-action=cancel]').addEventListener('click', e => {
		e.preventDefault();
		router.navigate('/todos');
	});
}

function getFormData() {
	const form = document.forms[0];
	return {
		title: form.title.value,
		category: form.category.value,
		dueDate: form.date.value
	};
}
