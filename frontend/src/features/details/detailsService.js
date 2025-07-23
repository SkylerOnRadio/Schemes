import axios from 'axios';

const API_URL = '/api/user/';

const getUserDetails = async () => {
	const res = await axios.get(API_URL);
	return res.data;
};

const postUserDetails = async (userData) => {
	const res = await axios.post(API_URL, userData);
	return res.data;
};

const updateUserDetails = async (userData) => {
	const res = await axios.put(API_URL, userData);
	return res.data;
};

const detailsService = {
	getUserDetails,
	postUserDetails,
	updateUserDetails,
};

export default detailsService;
