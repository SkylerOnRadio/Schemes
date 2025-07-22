import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSchemeFeedbacks, reset } from '../features/feedback/feedbackSlice';
import FeedbackCard from './FeedbackCard';
import LoadingBar from './LoadingBar';
import AddFeedback from './AddFeedback';
import { toast } from 'react-toastify';

const Feedbacks = () => {
	const dispatch = useDispatch();

	const { id } = useParams();

	const { feedback, isError, isLoading, feedbackAdded, message } = useSelector(
		(state) => state.feedback
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		dispatch(getSchemeFeedbacks(id));
	}, [isError, message, dispatch]);

	const feedbackExists = () => {
		if (feedback && feedback !== null) {
			return true;
		}
		return false;
	};

	useEffect(() => {
		if (isError) {
			toast.error(message);
			dispatch(reset());
		}

		if (feedbackAdded) {
			toast.success('Feedback added.');
			dispatch(reset());
		}
	}, [isError, feedbackAdded, message, dispatch]);

	if (isLoading)
		return (
			<div className="bg-white rounded-2xl ml-9 mr-8 mt-7 h-fit">
				<LoadingBar />
			</div>
		);

	return (
		<div className="bg-white rounded-2xl ml-9 mr-8 mt-7 h-fit pb-3 ">
			<h2 className="text-3xl font-semibold text-emerald-800 ml-7 pt-6">
				Feedbacks:
			</h2>

			<AddFeedback />

			{feedbackExists() ? (
				<>
					{feedback.map((feedback) => (
						<FeedbackCard key={feedback._id} feedback={feedback} />
					))}
				</>
			) : (
				<div>No Feedbacks Yet</div>
			)}
		</div>
	);
};

export default Feedbacks;
