import { Link } from 'react-router-dom';

const NoUserData = () => {
	return (
		<div className=" text-center">
			<h1 className="text-4xl  mt-15 font-semibold text-emerald-800 mb-10">
				You have not filled in your details.
			</h1>
			<h2 className="text-3xl  mb-10 text-emerald-700">
				Please fill in your details to check your eligibility
			</h2>
			<div className="flex flex-col justify-center items-center">
				<Link
					to="/add-details"
					className="pt-1 bg-blue-600 m-3 w-40 h-10  rounded text-xl hover:bg-blue-700 mb-13"
				>
					Add Details
				</Link>
			</div>
		</div>
	);
};

export default NoUserData;
