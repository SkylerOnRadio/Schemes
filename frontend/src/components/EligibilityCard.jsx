import NoUserData from './NoUserData';
import NotLoggedIn from './NotLoggedIn';
import Eligibility from './Eligibility';
import { useSelector } from 'react-redux';

const EligibilityCard = () => {
	const { user } = useSelector((state) => state.auth);

	const userExists = () => {
		if (user && user !== null) return true;
		return false;
	};

	const userHasDetails = () => {
		if (userExists()) return user.hasDetails;
		return false;
	};

	return (
		<div className="bg-white border w-95 mt-7 rounded-2xl h-fit">
			{userExists() ? (
				<div>
					{userHasDetails() ? (
						<div className=" text-center">
							<h1 className="text-4xl  mt-15 font-semibold text-emerald-800 mb-10">
								Eligibility
							</h1>
							<Eligibility />
						</div>
					) : (
						<NoUserData />
					)}
				</div>
			) : (
				<NotLoggedIn />
			)}
		</div>
	);
};

export default EligibilityCard;
