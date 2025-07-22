import { FaFrown } from 'react-icons/fa';

const NotFound = () => {
	return (
		<div className="flex flex-col justify-center items-center text-center h-128">
			<h1 className="text-8xl font-bold text-white">404</h1>
			<h2 className="text-6xl font-semibold text-white">
				This page does not exist.
			</h2>
			<FaFrown className="size-45 text-white mt-10" />
		</div>
	);
};

export default NotFound;
