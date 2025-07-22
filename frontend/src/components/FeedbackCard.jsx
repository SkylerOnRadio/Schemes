import { formatDistanceToNow } from 'date-fns';

const FeedbackCard = ({ feedback }) => {
	const timeAgo = feedback?.createdAt
		? formatDistanceToNow(new Date(feedback.createdAt), { addSuffix: true })
		: 'some time ago';

	return (
		<div className="ml-12 bg-gray-100 rounded-2xl mr-12 mb-3 mt-3">
			<div className="ml-5">
				<h2 className="font-semibold text-blue-600 text-2xl">
					{feedback.username || 'user'}
				</h2>
				<p className="text-sm text-gray-500">{timeAgo}</p>
				<h2 className="ml-4 mb-2 text-xl pb-2">{feedback.message}</h2>
			</div>
		</div>
	);
};

export default FeedbackCard;
