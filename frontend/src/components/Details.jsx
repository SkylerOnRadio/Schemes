import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, reset } from '../features/details/detailsSlice';
import { Link } from 'react-router-dom';

const Details = () => {
	const dispatch = useDispatch();

	const { details, isError, isLoading, message } = useSelector(
		(state) => state.details
	);

	useEffect(() => {
		if (isError) console.log(message);
		dispatch(getUserDetails());
		return () => {
			dispatch(reset());
		};
	}, []);

	const detailsExists = () => {
		if (details && details !== null) return true;
		return false;
	};

	return (
		<>
			{detailsExists() ? (
				<>
					<div className="flex flex-col items-center justify-center space-y-6 mt-6">
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-3 text-gray-700 text-center">
							<p>
								<strong>Gender:</strong> {details.gender || 'N/A'}
							</p>
							<p>
								<strong>Age:</strong> {details.age || 'N/A'}
							</p>
							<p>
								<strong>Income:</strong> {details.income || 'N/A'}
							</p>
							<p>
								<strong>Caste:</strong> {details.caste || 'N/A'}
							</p>
							<p>
								<strong>Disability:</strong> {details.disability ? 'Yes' : 'No'}
							</p>
							<p>
								<strong>Marital Status:</strong>{' '}
								{details.marital_status || 'N/A'}
							</p>
							<p>
								<strong>Minority:</strong> {details.minority ? 'Yes' : 'No'}
							</p>
							<p>
								<strong>Locality:</strong> {details.locality || 'N/A'}
							</p>
							<p>
								<strong>Below Poverty Line:</strong>{' '}
								{details.below_poverty ? 'Yes' : 'No'}
							</p>
							<p>
								<strong>Student:</strong> {details.student ? 'Yes' : 'No'}
							</p>
						</div>

						<Link
							to="/edit-details"
							className="bg-blue-600 text-white text-center py-2 px-4 rounded w-25 text-xl hover:bg-blue-700"
						>
							Edit
						</Link>
					</div>
				</>
			) : (
				<>
					<div className="text-center text-gray-700">
						<strong className="block mb-4">
							You must add your details first.
						</strong>
						<Link
							to="/add-details"
							className="inline-block bg-blue-600 text-white py-2 px-6 rounded text-xl hover:bg-blue-700"
						>
							Add
						</Link>
					</div>
				</>
			)}
		</>
	);
};

export default Details;
