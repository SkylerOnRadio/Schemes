import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { checkUser, reset } from '../features/eligibility/eligibilitySlice';
import EligibleList from '../components/EligibleList';
import { FaFrown } from 'react-icons/fa';
import LoadingBar from '../components/LoadingBar';

const EligiblePage = () => {
	const dispatch = useDispatch();
	const {
		schemes = {},
		isError,
		message,
		isLoading,
	} = useSelector((state) => state.eligibility || {});
	const { user = {} } = useSelector((state) => state.user || {});

	useEffect(() => {
		if (isError) toast.error(message);
		dispatch(checkUser());
		return () => dispatch(reset());
	}, []);

	if (isLoading)
		return (
			<div className="bg-white mx-auto w-256 text-center pb-5 rounded-2xl mt-15">
				<LoadingBar />
			</div>
		);

	return (
		<div className="bg-white mx-auto w-256 text-center pb-5 rounded-2xl mt-15">
			<h1 className="text-5xl py-7 font-semibold text-emerald-800">
				You Are Eligible For:
			</h1>
			<div>
				{user?.hasDetails ? (
					<>
						{schemes?.result?.map((scheme) => (
							<EligibleList key={scheme.scheme_id} scheme={scheme} />
						))}
					</>
				) : (
					<div className="flex pt-1 bg-gray-200 items-center justify-center mx-50 rounded-2xl text-2xl font-semibold text-emerald-600 hover:scale-[1.03] pb-2">
						You are not Eligible for any schemes.
						<FaFrown className="mt-1 ml-3" />
					</div>
				)}
			</div>
		</div>
	);
};

export default EligiblePage;
