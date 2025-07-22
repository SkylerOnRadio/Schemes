import { useSelector } from 'react-redux';
import Details from '../components/Details';

const DetailsPage = () => {
	const { user } = useSelector((state) => state.auth);

	if (!user) {
		return (
			<div className="flex justify-center items-center h-screen">
				<h1 className="text-2xl text-red-600 font-semibold">
					User not logged in
				</h1>
			</div>
		);
	}

	return (
		<div className="max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-6">
			<div className="flex flex-col items-center">
				<img
					src={user.profileImage || '/images/user.png'}
					alt="User Avatar"
					className="w-32 h-32 rounded-full border-2 mb-4"
				/>
				<h2 className="text-2xl font-bold text-gray-800">{user.username}</h2>
				<p className="text-gray-600">Email: {user.email}</p>
				<p className="text-gray-600 mb-4">
					Joined on: {new Date(user.createdAt).toDateString()}
				</p>
			</div>

			<Details />
		</div>
	);
};

export default DetailsPage;
