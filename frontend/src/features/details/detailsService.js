import axios from 'axios';

const API_URL = '/api/user/';

const getUserDetails = async () => {
	const res = await axios.get(API_URL);
	return res.data;
};

const detailsService = { getUserDetails };

export default detailsService;
