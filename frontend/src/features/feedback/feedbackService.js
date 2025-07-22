import axios from 'axios';

const API_URL = '/api/feedbacks/';

const getSchemeFeedbacks = async (scheme_id) => {
	const res = await axios.get(API_URL + `${scheme_id}`);
	return res.data;
};

const postSchemeFeedback = async (scheme_id, feedback) => {
	const res = await axios.post(API_URL + `${scheme_id}`, { feedback });
	return res.data;
};

const feedbackService = { getSchemeFeedbacks, postSchemeFeedback };

export default feedbackService;
