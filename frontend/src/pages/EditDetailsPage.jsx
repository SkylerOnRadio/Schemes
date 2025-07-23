import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	getUserDetails,
	reset,
	updateUserDetails,
} from '../features/details/detailsSlice';

const EditDetailsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { details, isError, updatedDetails, message } = useSelector(
		(state) => state.details
	);

	const { user } = useSelector((state) => state.auth);

	const [formData, setFormData] = useState({
		gender: '',
		age: '',
		income: '',
		caste: '',
		disability: false,
		marital_status: '',
		minority: false,
		locality: '',
		below_poverty: false,
		student: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	useEffect(() => {
		if (isError) console.log(message);
		dispatch(getUserDetails());
		return () => {
			dispatch(reset());
		};
	}, []);

	useEffect(() => {
		if (details && Object.keys(details).length > 0) {
			setFormData({
				gender: details.gender || '',
				age: details.age || '',
				income: details.income || '',
				caste: details.caste || '',
				disability: details.disability || false,
				marital_status: details.marital_status || '',
				minority: details.minority || false,
				locality: details.locality || '',
				below_poverty: details.below_poverty || false,
				student: details.student || false,
			});
		}
	}, [details]);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(updateUserDetails(formData));
	};

	useEffect(() => {
		if (user?.hasDetails === false) {
			toast.info('You need to add your details first!');
			navigate('/add-details');
		}
	}, [user?.hasDetails, navigate]);

	useEffect(() => {
		if (updatedDetails) {
			dispatch(reset());
			toast.success('Updated Details!');
			navigate('/user');
		}
	}, [updatedDetails, dispatch, navigate]);

	useEffect(() => {
		if (isError) {
			toast.error(message);
			dispatch(reset());
		}
	}, [isError, message, dispatch]);

	const hasDetails = () => {
		if (!user.hasDetails) return true;
		return false;
	};

	return (
		<>
			{hasDetails() ? (
				<></>
			) : (
				<div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
					<h2 className="text-2xl font-bold text-center mb-6">
						Add Your Details
					</h2>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block font-medium">Gender</label>
							<select
								name="gender"
								value={formData.gender}
								onChange={handleChange}
								className="w-full p-2 border rounded"
							>
								<option value="">Select</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
								<option value="Other">Other</option>
							</select>
						</div>

						<div>
							<label className="block font-medium">Age</label>
							<input
								type="number"
								name="age"
								value={formData.age}
								onChange={handleChange}
								className="w-full p-2 border rounded"
							/>
						</div>

						<div>
							<label className="block font-medium">Income</label>
							<input
								type="text"
								name="income"
								value={formData.income}
								onChange={handleChange}
								className="w-full p-2 border rounded"
							/>
						</div>

						<div>
							<label className="block font-medium">Caste</label>
							<select
								name="caste"
								value={formData.caste}
								onChange={handleChange}
								className="w-full p-2 border rounded"
							>
								<option value="">Select</option>
								<option value="General">General</option>
								<option value="SC">SC</option>
								<option value="ST">ST</option>
							</select>
						</div>

						<div>
							<label className="block font-medium">Marital Status</label>
							<select
								name="marital_status"
								value={formData.marital_status}
								onChange={handleChange}
								className="w-full p-2 border rounded"
							>
								<option value="">Select</option>
								<option value="Single">Single</option>
								<option value="Married">Married</option>
								<option value="Divorced">Divorced</option>
							</select>
						</div>

						<div className="grid grid-cols-2 gap-4">
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									name="disability"
									checked={formData.disability}
									onChange={handleChange}
								/>
								Disability
							</label>

							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									name="minority"
									checked={formData.minority}
									onChange={handleChange}
								/>
								Minority
							</label>

							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									name="below_poverty"
									checked={formData.below_poverty}
									onChange={handleChange}
								/>
								Below Poverty Line
							</label>

							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									name="student"
									checked={formData.student}
									onChange={handleChange}
								/>
								Student
							</label>
						</div>

						<div>
							<label className="block font-medium">Locality</label>
							<select
								name="locality"
								value={formData.locality}
								onChange={handleChange}
								className="w-full p-2 border rounded"
							>
								<option value="">Select</option>
								<option value="Urban">Urban</option>
								<option value="Rural">Rural</option>
							</select>
						</div>

						<button
							type="submit"
							className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
						>
							Save Details
						</button>
					</form>
				</div>
			)}
		</>
	);
};

export default EditDetailsPage;
