import axios from 'axios';

const API_URL = 'api/users/';

const login = async (userData) => {
	const res = await axios.post(API_URL + 'login', userData);

	if (res.data) {
		localStorage.setItem('user', JSON.stringify(res.data));
	}
	console.log('API response:', res.data);
	return res.data;
};

const logout = () => {
	localStorage.removeItem('user');
};

const authService = { login, logout };

export default authService;
