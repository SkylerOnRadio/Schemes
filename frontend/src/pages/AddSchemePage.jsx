import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addScheme, reset } from '../features/schemes/schemesSlice';
import { toast } from 'react-toastify';

const AddSchemePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { scheme, addedScheme, isError, message } = useSelector(
		(state) => state.scheme
	);

	const [formData, setFormData] = useState({
		title: '',
		benefits: '',
		objectives: '',
		eligibility: '',
		agency: '',
		summary: '',
		application: '',
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const body = {
			...formData,
			// split comma-separated values into arrays
			benefits: formData.benefits.split(',').map((b) => b.trim()),
			objectives: formData.objectives.split(',').map((o) => o.trim()),
			eligibility: formData.eligibility
				? formData.eligibility.split(',').map((e) => e.trim())
				: [],
		};

		dispatch(addScheme(body));
		return () => {
			dispatch(reset());
		};
	};

	useEffect(() => {
		if (scheme && scheme !== null && addedScheme) {
			if (isError) {
				toast.error(message);
			}
			if (addedScheme) {
				toast.success('Added Scheme!');
			}
			if (scheme._id !== null && scheme._id !== '') {
				console.log(scheme._id);
				navigate(`/add-scheme-details/${scheme._id}`);
			}
		}
		return () => dispatch(reset());
	}, [scheme, isError, message, addedScheme, navigate]);

	return (
		<div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
			<h2 className="text-2xl font-bold mb-6 text-center text-blue-800">
				Add New Scheme
			</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				<Input
					label="Title"
					name="title"
					value={formData.title}
					onChange={handleChange}
				/>
				<Input
					label="Benefits (comma separated)"
					name="benefits"
					value={formData.benefits}
					onChange={handleChange}
				/>
				<Input
					label="Objectives (comma separated)"
					name="objectives"
					value={formData.objectives}
					onChange={handleChange}
				/>
				<Input
					label="Eligibility (comma separated)"
					name="eligibility"
					value={formData.eligibility}
					onChange={handleChange}
				/>
				<Input
					label="Agency"
					name="agency"
					value={formData.agency}
					onChange={handleChange}
				/>
				<TextArea
					label="Summary"
					name="summary"
					value={formData.summary}
					onChange={handleChange}
				/>
				<TextArea
					label="Application Process"
					name="application"
					value={formData.application}
					onChange={handleChange}
				/>

				<button
					type="submit"
					className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
				>
					Submit
				</button>
			</form>
		</div>
	);
};

// Reusable Input component
const Input = ({ label, name, value, onChange }) => (
	<div>
		<label htmlFor={name} className="block mb-1 font-medium text-gray-700">
			{label}
		</label>
		<input
			type="text"
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			className="w-full border border-gray-300 rounded px-3 py-2"
			required
		/>
	</div>
);

// Reusable TextArea component
const TextArea = ({ label, name, value, onChange }) => (
	<div>
		<label htmlFor={name} className="block mb-1 font-medium text-gray-700">
			{label}
		</label>
		<textarea
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			rows={4}
			className="w-full border border-gray-300 rounded px-3 py-2"
			required
		/>
	</div>
);

export default AddSchemePage;
