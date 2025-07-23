import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFeedbacks, reset } from '../features/feedback/feedbackSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const FeedbacksPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { feedback, isError, isLoading, message } = useSelector(
		(state) => state.feedback
	);

	useEffect(() => {
		if (isError) {
			toast.error(message);
		}

		dispatch(getUserFeedbacks());

		return () => {
			dispatch(reset());
		};
	}, [isError, message, dispatch]);

	const feedbackExists = () => {
		if (feedback && feedback !== null) {
			return true;
		}
		return false;
	};

	const toScheme = (id) => {
		navigate(`/schemes/${id}`);
	};

	return (
		<div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-xl shadow">
			<h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">
				Your Submitted Feedbacks
			</h2>

			{feedbackExists() ? (
				<div className="space-y-4">
					{feedback.map((feedback) => (
						<div
							key={feedback._id}
							className="border border-gray-200 p-4 rounded-md hover:shadow transition"
							onClick={() => toScheme(feedback.scheme)}
						>
							<div className="flex justify-between items-center mb-2">
								<span className="text-sm text-gray-500">
									{feedback.createdAt
										? new Date(feedback.createdAt).toLocaleTimeString('en-IN', {
												day: '2-digit',
												month: '2-digit',
												year: 'numeric',
										  })
										: 'Loading...'}
								</span>
							</div>
							<p className="text-gray-800">{feedback.message}</p>
						</div>
					))}
				</div>
			) : (
				<p className="text-gray-500 text-center">
					You haven't submitted any feedback yet.
				</p>
			)}
		</div>
	);
};

export default FeedbacksPage;
