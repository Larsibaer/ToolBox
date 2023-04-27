import service from '../service.js';
import router from '../router.js';
import util from "../util.js";
import store from "../store.js";


export default {
	requiresAuth: true,

	getTitle: function() {
		return "Add Todo";
	},

	render: function() {
		return util.loadTemplate('add-todo', initView);
	}
}

function initView(view) {

	view.querySelector('[data-action=cancel]').addEventListener('click', e => {
		e.preventDefault();
		router.navigate('/todos');
	});

	view.querySelector('[data-action=add]').addEventListener('click', e => {
		e.preventDefault();

		service.postTodo(store.getUser(), getFormData())
			.then(todo => {
				store.addTodo(todo);
				router.navigate('/todos');
			}).catch(error => {
			view.querySelector('[data-field=error]').innerHTML = "Adding todo failed!";
			console.log(error);
		});
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
