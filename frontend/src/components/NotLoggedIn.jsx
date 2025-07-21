import { Link } from 'react-router-dom';

const NotLoggedIn = () => {
	return (
		<div className=" text-center">
			<h1 className="text-4xl  mt-15 font-semibold text-emerald-800 mb-10">
				You are not logged in.
			</h1>
			<h2 className="text-3xl  mb-10 text-emerald-700">
				Please login/register to check your eligibility
			</h2>
			<div className="flex flex-col justify-center items-center">
				<Link
					to="/register"
					className="pt-1 bg-blue-600 m-3 w-40 h-10  rounded text-xl hover:bg-blue-700"
				>
					Register
				</Link>
				<Link
					to="/login"
					className="pt-1 bg-blue-600 m-3 w-40 h-10 rounded text-xl hover:bg-blue-700 mb-15"
				>
					Login
				</Link>
			</div>
		</div>
	);
};

export default NotLoggedIn;
