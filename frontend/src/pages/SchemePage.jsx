import EligibilityCard from '../components/EligibilityCard';
import Feedbacks from '../components/Feedbacks';
import SchemeDetails from '../components/SchemeDetails';

const SchemePage = () => {
	return (
		<>
			<div className="flex">
				<SchemeDetails />
				<EligibilityCard />
			</div>
			<div>
				<Feedbacks />
			</div>
		</>
	);
};

export default SchemePage;
