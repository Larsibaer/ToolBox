import util from './util.js';
import store from './store.js';

const main = document.querySelector('main');
const routes = Object.create(null); // {}

export default {
	register: function(path, component) {
		routes[path] = component;
	},
	navigate: function(path, param) {
		path += param ? '/' + param : '';
		if (location.hash !== '#' + path) {
			location.hash = path;
		} else {
			render();
		}
	}
}

function render() {
	const hash = location.hash.replace('#/', '').split('/');
	const path = '/' + (hash[0] || '');
	if (!routes[path]) {
		const view = util.createNodeFromHTML('<div><h2>404 - Not Found</h2><p>Sorry, page not found</p></div>')
		replaceView(view);
		return;
	}
	const component = routes[path];
	if (component.requiresAuth && !store.getUser()) {
		const view = util.createNodeFromHTML('<div><h2>401 - Unauthorized</h2><p>Please login!</p></div>')
		replaceView(view);
		return;
	}
	const param = hash.length > 1 ? hash[1] : null;
	const view = component.render(param);
	replaceView(view);
	document.title = "Todo App" + (component.getTitle ? " - " + component.getTitle() : "");
}

function replaceView(view) {
	main.firstElementChild.remove();
	main.append(view);
}

window.addEventListener('hashchange', render);
