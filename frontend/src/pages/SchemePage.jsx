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
		<div className="flex">
			<div className=" ml-9 mt-7 bg-white rounded-2xl mr-9 w-250 pb-6 border">
				<h1 className=" text-5xl text-teal-900 font-semibold ml-4 mb-9 pt-7">
					{scheme.title}
					<p className="ml-9 text-3xl">By: {scheme.agency}</p>
				</h1>

				<div className="ml-20 mr-3 text-3xl mt-1.5 font-semibold text-teal-800">
					<h2>Summary</h2>
					<p className="ml-14 text-xl mt-2 text-black">{scheme.summary}</p>
					<h2>Objectives</h2>
					<p className="ml-20 text-xl mt-2 text-black">
						{scheme.objectives.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</p>
					<h2>Benefits</h2>
					<p className="ml-20 text-xl mt-2 text-black">
						{scheme.benefits.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</p>
					<h2>Eligibility</h2>
					<p className="ml-20 text-xl mt-2 text-black">
						{scheme.eligibility.map((item, i) => (
							<li key={i}>{item}</li>
						))}
					</p>
				</div>
			</div>
			<div className="bg-white border w-95 mt-7 rounded-2xl">hello</div>
		</div>
	);
};

export default SchemePage;
