import axios from 'axios';

const API_URL = '/api/schemes/';

//show schemes
const getSchemes = async () => {
	const res = await axios.get(API_URL);
	return res.data;
};

//get specific scheme
const getScheme = async (id) => {
	const res = await axios.get(API_URL + `${id}`);
	return res.data;
};

const schemeService = { getSchemes, getScheme };

export default schemeService;
