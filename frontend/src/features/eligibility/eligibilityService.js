import axios from 'axios';

const API_URL = '/api/eligibility/';

const checkScheme = async (schemeId) => {
	const res = await axios.get(API_URL + `check/${schemeId}`);
	return res.data;
};

const addSchemeCriteria = async (schemeId, data) => {
	const res = await axios.post(API_URL + `${schemeId}`, data);
	return res.data;
};

const checkUser = async () => {
	const res = await axios.get(API_URL + 'checkAll');
	return res.data;
};

const eligibilityService = { checkScheme, addSchemeCriteria, checkUser };
export default eligibilityService;
