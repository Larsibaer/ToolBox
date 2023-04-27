const BASE_URL = 'api/';

export default {
	postUser: function(user) {
		return ajax(BASE_URL + 'users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		});
	},

	getTodos: function(user) {
		return ajax(BASE_URL + 'todos', {
			method: 'GET',
			headers: {
				'Authorization': getAuthHeader(user),
				'Accept': 'application/json'
			}
		});
	},

	postTodo: function(user, todo) {
		return ajax(BASE_URL + 'todos', {
			method: 'POST',
			headers: {
				'Authorization': getAuthHeader(user),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(todo)
		});
	},

	putTodo: function(user, todo) {
		return ajax(BASE_URL + 'todos/' + todo.id, {
			method: 'PUT',
			headers: {
				'Authorization': getAuthHeader(user),
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(todo)
		});
	}
}

function ajax(url, options) {
	return fetch(url, options)
		.then(response => {
			if (!response.ok) throw response;
			return response.headers.get('Content-Type') === 'application/json' ? response.json() : response;
		})
}

function getAuthHeader(user) {
	return 'Basic ' + btoa(user.name + ':' + user.password);
}
