import util from '../util.js';
import service from '../service.js';
import store from '../store.js';



export default {
	requiresAuth: true,

	getTitle: function() {
		return "Todos";
	},

	render: function() {
		return util.loadTemplate('todos', initView);
	}
}

function initView(view) {
	store.getTodos().forEach(item => renderListItem(view, item));
}

function renderListItem(view, todo) {
	const tpl =
		`<li class="${todo.completed ? 'completed' : ''}">
			<a data-action="toggle-completed" href="#" class="icon success">&#x2713;</a>
			<span class="todo-title">${todo.dueDate ? todo.dueDate + ' &nbsp; ' : ''} <b>${todo.title}</b></span>
			<span class="actions">
				<a data-action="edit" href="#/edit-todo/${todo.id}" class="icon">&#x270e;</a>
				<a data-action="delete" href="#"  class="icon danger">&#x2717;</a>
			</span>
		</li>`;

	const li = util.createNodeFromHTML(tpl);
	view.querySelector('ul').append(li);
}

