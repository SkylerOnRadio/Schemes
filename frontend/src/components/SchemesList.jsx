import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { reset, getSchemes } from '../features/schemes/schemesSlice';
import SchemeCard from './SchemeCard';

const SchemesList = () => {
	const dispatch = useDispatch();

	const { schemes, isLoading, isError, message } = useSelector(
		(state) => state.scheme
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		dispatch(getSchemes());
		return () => {
			dispatch(reset());
		};
	}, [dispatch, isError, message]);

	return (
		<>
			<h1 className="text-3xl   text-amber-700 mb-4">Schemes: </h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 ml-7">
				{schemes.map((scheme) => (
					<SchemeCard key={scheme.id} scheme={scheme} />
				))}
			</div>
		</>
	);
};

export default SchemesList;
