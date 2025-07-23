import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user, isError, isLoading, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (isError) toast.error(message);
		if (isSuccess) {
			navigate('/');
			toast.success('Logged In');
		}
		dispatch(reset());
	}, [isError, isSuccess, useDispatch, message, dispatch, navigate]);

	const { email, password } = formData;

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const userData = { email, password };
		dispatch(login(userData));
	};

	return (
		<div className="flex justify-center items-center ">
			<div className="mt-10 bg-gray-600 rounded-2xl w-102">
				<div>
					<form onSubmit={onSubmit}>
						<h2 className="text-center text-4xl font-semibold text-white mb-7 mt-3">
							Login
						</h2>

						<label className="ml-10 block text-xl mb-1.5">Email:</label>
						<input
							type="email"
							className="ml-10 bg-white rounded  w-80 mb-4 h-9 shadow"
							name="email"
							value={email}
							onChange={onChange}
						/>

						<label className="ml-10 block text-xl mb-1.5">Password:</label>
						<input
							type="password"
							className="block ml-10 bg-white rounded  w-80 mb-4 h-9 shadow"
							name="password"
							value={password}
							onChange={onChange}
						/>
						<div className="flex justify-center">
							<button
								type="submit"
								className="bg-emerald-700 text-xl font-semibold mb-5  w-30 h-10 rounded mt-5 hover:bg-emerald-800  "
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
