
let data = {};

export default {
	setUser: function(user) {
		data.user = user;
	},
	getUser: function() {
		return data.user;
	},

	setTodos: function(todos) {
		data.todos = todos;
	},
	getTodos: function() {
		return data.todos;
	},
	getTodo: function(id) {
		return data.todos.find(todo => todo.id === Number(id));
	},
	addTodo: function(todo) {
		data.todos.push(todo);
	},
	removeTodo: function(id) {
		const i = data.todos.findIndex(todo => todo.id === Number(id));
		if (i >= 0) {
			data.todos.splice(i, 1);
		}
	},

	clear: function() {
		data = {};
	}
}
