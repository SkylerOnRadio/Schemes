import { useNavigate } from 'react-router-dom';

const SchemeCard = ({ scheme }) => {
	let description = scheme.summary;
	description = description.substring(0, 250) + '...';

	const navigate = useNavigate();

	const sendToScheme = (id) => {
		navigate(`/schemes/${id}`);
	};

	return (
		<div
			className="bg-white rounded-xl shadow-xl hover:scale-[1.04] transition-transform duration-200 h-64 w-80 overflow-hidden p-4 flex flex-col justify-between mb-5"
			onClick={() => sendToScheme(scheme._id)}
		>
			<div>
				<h1 className="text-xl font-bold text-green-700 mb-1">
					{scheme.title}
				</h1>
				<p className="text-blue-800 font-bold mb-2">By: {scheme.agency}</p>
				<p className="text-gray-700 text-sm break-words overflow-hidden text-ellipsis">
					{description}
				</p>
			</div>
		</div>
	);
};

export default SchemeCard;
