import axios from 'axios';

const API_URL = '/api/schemes/';

//show schemes
const getSchemes = async () => {
	const res = await axios.get(API_URL);
	return res.data;
};

const schemeService = { getSchemes };

export default schemeService;
