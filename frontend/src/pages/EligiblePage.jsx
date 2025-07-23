import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { checkUser, reset } from '../features/eligibility/eligibilitySlice';
import EligibleList from '../components/EligibleList';

const EligiblePage = () => {
	const dispatch = useDispatch();

	const { schemes, isError, message, isLoading } = useSelector(
		(state) => state.eligibility
	);

	useEffect(() => {
		if (isError) toast.error(message);
		dispatch(checkUser());
		return () => dispatch(reset());
	}, []);

	return (
		<div className="bg-white mx-auto w-256 text-center pb-5 rounded-2xl mt-15">
			<h1 className="text-5xl py-7 font-semibold text-emerald-800">
				You Are Eligible For:
			</h1>
			<div>
				{schemes.result.map((scheme, index) => (
					<EligibleList key={scheme.scheme_id} scheme={scheme} />
				))}
			</div>
		</div>
	);
};

export default EligiblePage;
