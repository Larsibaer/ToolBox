import util from '../util.js';
import service from '../service.js';
import router from '../router.js';
import store from '../store.js';

export default {
	render: function() {
		return util.loadTemplate('login', initView);
	}
};

function initView(view) {
	// ***
	if (store.getUser()) {
		router.navigate('/todos');
		return;
	}

	view.querySelector('[data-action=login]').addEventListener('click', e => {
		e.preventDefault();
		processLogin(view);
	});

	view.querySelector('[data-action=register]').addEventListener('click', e => {
		e.preventDefault();
		processRegister(view);
	});
}

function getFormData() {
	const form = document.forms[0];
	return {
		name: form.username.value,
		password: form.password.value
	};
}

function initAfterLogin(user, todos) {
	store.setUser(user);
	store.setTodos(todos);
	util.showAuthContent(true);
	util.updateDataField('user.name', user.name);
	router.navigate('/todos');
}

function processLogin(view) {
	const user = getFormData();
	service.getTodos(user)
		.then(todos => initAfterLogin(user, todos))
		.catch(error => {
			let msg = error.status === 401
				? "Wrong username or password. Please try again."
				: "Retrieving todos failed!";
			util.updateDataField('error', msg);
		});
}

function processRegister(view) {
	const user = getFormData();
	service.postUser(user)
		.then(data => initAfterLogin(user, []))
		.catch(error => {
			let msg;
			switch(error.status) {
				case 400: msg = "The provided user data is invalid!"; break;
				case 409: msg = "Please choose another username!"; break;
				default: msg = "Registering user failed!";
			}
			util.updateDataField('error', msg);
		});
}
