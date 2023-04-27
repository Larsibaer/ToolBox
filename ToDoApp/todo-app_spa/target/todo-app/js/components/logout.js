import util from '../util.js';
import store from '../store.js';

 export default {

	 requiresAuth: true,

	getTitle: function() {
		return "Bye-bye";
	},

	 render: function() {
		store.clear();
		util.showAuthContent(false);
		return util.loadTemplate('logout');
	 }
 }
