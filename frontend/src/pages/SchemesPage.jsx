import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSchemes, reset } from '../features/schemes/schemesSlice';
import SchemesList from '../components/SchemesList';

const SchemePage = () => {
	return (
		<>
			<div>
				<SchemesList />
			</div>
		</>
	);
};

export default SchemePage;
