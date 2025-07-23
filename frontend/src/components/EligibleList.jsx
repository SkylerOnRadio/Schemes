import { useNavigate } from 'react-router-dom';

const EligibleList = ({ scheme }) => {
	const navigate = useNavigate();

	const sendToScheme = (id) => {
		navigate(`/schemes/${id}`);
	};

	return (
		<div
			onClick={() => sendToScheme(scheme.scheme_id)}
			className="bg-gray-200 mx-50 rounded-2xl text-2xl font-semibold text-emerald-600 hover:scale-[1.03] pb-2"
		>
			{scheme.scheme_name}
		</div>
	);
};

export default EligibleList;
