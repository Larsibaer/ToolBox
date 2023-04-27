import router from './router.js';

import login from './components/login.js';
import logout from './components/logout.js';
import todos from './components/todos.js';
import addTodo from './components/add-todo.js';
import editTodo from './components/edit-todo.js';

router.register('/', login);
router.register('/logout', logout);
router.register('/todos', todos);
router.register('/add-todo', addTodo);
router.register('/edit-todo', editTodo);

/*
if (location.hash) {
	router.navigate(location.hash.replace('#', ''));
} else {
	router.navigate('/');
}
*/
router.navigate('/');
