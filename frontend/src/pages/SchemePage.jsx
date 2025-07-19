import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getScheme, reset } from '../features/schemes/schemesSlice';
import { useParams } from 'react-router-dom';

const SchemePage = () => {
	const dispatch = useDispatch();

	const { id } = useParams();

	const { scheme, isLoading, isError, message } = useSelector(
		(state) => state.scheme
	);

	useEffect(() => {
		if (isError) {
			console.log(message);
		}
		dispatch(getScheme(id));
		return () => {
			dispatch(reset());
		};
	}, [dispatch, isError, message]);

	if (isLoading) return <p>Loading...</p>;
	if (isError) return <p>{message}</p>;
	if (!scheme) return <p>Scheme not found</p>;

	return (
		<div className="ml-3 mt-5 bg-white rounded-2xl mr-3">
			<h1 className=" text-5xl text-teal-900 font-semibold ml-2">
				{scheme.title}
			</h1>
			<h2 className="ml-10 text-3xl mt-1.5 font-semibold text-teal-800">
				Summary
			</h2>
			<p className="ml-14 text-xl mt-2">{scheme.summary}</p>
			<h2 className="ml-10 text-3xl mt-1.5 font-semibold text-teal-800">
				Benefits
			</h2>
			<p className="ml-14 text-xl mt-2">
				{scheme.benefits.map((item, i) => (
					<li key={i}>{item}</li>
				))}
			</p>
			<h2 className="ml-10 text-3xl mt-1.5 font-semibold text-teal-800">
				Summary
			</h2>
			<p className="ml-14 text-xl mt-2">{scheme.longDescription}</p>
			<h2 className="ml-10 text-3xl mt-1.5 font-semibold text-teal-800">
				Summary
			</h2>
			<p className="ml-14 text-xl mt-2">{scheme.longDescription}</p>
			<h2 className="ml-10 text-3xl mt-1.5 font-semibold text-teal-800">
				Summary
			</h2>
			<p className="ml-14 text-xl mt-2">{scheme.longDescription}</p>
		</div>
	);
};

export default SchemePage;
