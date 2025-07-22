import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postSchemeFeedback, reset } from '../features/feedback/feedbackSlice';
import { useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddFeedback = () => {
	const dispatch = useDispatch();
	const { id } = useParams();

	const { user } = useSelector((state) => state.auth);
	const { isError, isSuccess, message } = useSelector(
		(state) => state.feedback
	);

	const [feedback, setFeedback] = useState('');

	const submit = (e) => {
		e.preventDefault();
		dispatch(postSchemeFeedback({ scheme_id: id, feedback }));
		setFeedback('');
	};

	const userExist = () => user !== null;

	return (
		<div className="bg-gray-100 ml-13 rounded mr-13 p-4">
			{userExist() ? (
				<>
					<h1 className="text-gray-600 mb-2">Give your Feedback:</h1>
					<form onSubmit={submit} className="flex items-start gap-3">
						<textarea
							placeholder="Feedback..."
							className="bg-white rounded-2xl w-full min-h-[5rem] p-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
							value={feedback}
							onChange={(e) => setFeedback(e.target.value)}
						/>
						<button
							type="submit"
							className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded-2xl mt-auto mb-auto"
						>
							Submit
						</button>
					</form>
				</>
			) : (
				<div className="text-center">
					<h1 className="text-xl mb-2">Please log in to comment</h1>
					<div className="flex justify-center gap-6">
						<Link
							to="/login"
							className="text-xl bg-blue-500 p-2 rounded w-24 hover:bg-blue-600"
						>
							Login
						</Link>
						<Link
							to="/register"
							className="text-xl bg-blue-500 p-2 rounded w-28 hover:bg-blue-600"
						>
							Register
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddFeedback;
