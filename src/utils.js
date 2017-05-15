let isLogin = () => localStorage.getItem('token');
let logout = () => {
	localStorage.removeItem('token');
	window.location = '/';
}
module.exports = {
	isLogin,
	logout
}