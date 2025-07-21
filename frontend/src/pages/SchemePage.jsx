import EligibilityCard from '../components/EligibilityCard';
import SchemeDetails from '../components/SchemeDetails';

const SchemePage = () => {
	return (
		<div className="flex">
			<SchemeDetails />
			<EligibilityCard />
		</div>
	);
};

export default SchemePage;
