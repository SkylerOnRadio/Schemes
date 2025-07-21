import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { checkScheme, reset } from '../features/eligibility/eligibilitySlice';
import LoadingBar from './LoadingBar';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const Eligibility = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { user } = useSelector((state) => state.auth);

	const { eligibility, isLoading, isError, message } = useSelector(
		(state) => state.eligibility
	);

	const userHasDetails = () => {
		if (user && user.hasDetails) return true;
		return false;
	};

	useEffect(() => {
		if (userHasDetails()) {
			dispatch(checkScheme(id));
		}

		return () => {
			dispatch(reset());
		};
	}, [dispatch, id]);

	const isEligible = () => eligibility?.message === 'You are eligible.';

	if (isLoading) {
		return (
			<div className="bg-white border w-95 mt-7 rounded h-fit">
				<LoadingBar />
			</div>
		);
	}

	if (isError) {
		return (
			<div className="bg-white border w-95 mt-7 rounded h-fit p-5 text-red-600">
				{message}
			</div>
		);
	}

	return (
		<>
			{isEligible() ? (
				<>
					<div className="flex justify-center">
						<FaCheckCircle className="size-15 text-emerald-700" />
					</div>
					<div>
						<h2 className="text-2xl mt-7 mb-10 font-semibold text-emerald-800">
							You are eligible for this scheme.
						</h2>
					</div>
				</>
			) : (
				<>
					<div className="flex justify-center">
						<FaTimesCircle className="size-15 text-red-500" />
					</div>
					<div>
						<h2 className="text-2xl mt-7 mb-10 font-semibold text-red-700">
							You are eligible for this scheme.
						</h2>
						<h3 className="text-xl mt-7  font-semibold text-red-700">Failed</h3>
						<div className="flex justify-center mb-10">
							<div className="flex flex-col w-72">
								{' '}
								<div className="grid grid-cols-2 font-medium text-sm bg-gray-100 py-2 px-3 rounded-t">
									<div>Criteria</div>
									<div className="text-center">Status</div>
								</div>
								{eligibility?.failed?.map((fail, index) => (
									<div
										key={index}
										className="grid grid-cols-2 items-center text-sm py-2 px-3  bg-gray-50"
									>
										<div className="capitalize">
											{fail.replaceAll('_', ' ')}
										</div>
										<div className="text-center text-red-600">
											<FaTimesCircle className="inline text-lg" />
										</div>
									</div>
								))}
							</div>
						</div>
						<h3 className="text-xl mt-7  font-semibold text-emerald-700">
							Passed
						</h3>
						<div className="flex justify-center mb-10">
							<div className="flex flex-col w-72">
								{' '}
								<div className="grid grid-cols-2 font-medium text-sm bg-gray-100 py-2 px-3 rounded-t">
									<div>Criteria</div>
									<div className="text-center">Status</div>
								</div>
								{eligibility?.passed?.map((pass, index) => (
									<div
										key={index}
										className="grid grid-cols-2 items-center text-sm py-2 px-3  bg-gray-50"
									>
										<div className="capitalize">
											{pass.replaceAll('_', ' ')}
										</div>
										<div className="text-center text-emerald-600">
											<FaCheckCircle className="inline text-lg" />
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			)}
			;
		</>
	);
};

export default Eligibility;
