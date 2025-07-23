import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	addSchemeCriteria,
	reset,
} from '../features/eligibility/eligibilitySlice';

const AddDetailsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { id } = useParams();

	const { schemeEligibility, addedDetails, isError, message } = useSelector(
		(state) => state.eligibility
	);

	const { user } = useSelector((state) => state.auth);

	const [formData, setFormData] = useState({
		gender: '',
		min_age: '',
		max_age: '',
		max_income: '',
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(addSchemeCriteria({ schemeId: id, data: formData }));
	};

	useEffect(() => {
		if (isError) toast.error(message);

		if (addedDetails) {
			navigate(`/schemes/${id}`);
			toast.success('Added Scheme Details!');
		}
		dispatch(reset());
	}, [isError, addedDetails, message, dispatch, navigate]);

	return (
		<>
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
						<label className="block font-medium">Minimum Age</label>
						<input
							type="number"
							name="min_age"
							value={formData.min_age}
							onChange={handleChange}
							className="w-full p-2 border rounded"
						/>
					</div>

					<div>
						<label className="block font-medium">Maximum Age</label>
						<input
							type="number"
							name="max_age"
							value={formData.max_age}
							onChange={handleChange}
							className="w-full p-2 border rounded"
						/>
					</div>

					<div>
						<label className="block font-medium">Maximum Income</label>
						<input
							type="text"
							name="max_income"
							value={formData.max_income}
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
		</>
	);
};

export default AddDetailsPage;
