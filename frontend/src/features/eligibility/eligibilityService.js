import axios from 'axios';

const API_URL = '/api/eligibility/';

const checkScheme = async (schemeId) => {
	const res = await axios.get(API_URL + `check/${schemeId}`);
	return res.data;
};

const eligibilityService = { checkScheme };
export default eligibilityService;
