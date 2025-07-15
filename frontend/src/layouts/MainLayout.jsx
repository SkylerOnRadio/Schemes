import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
	return (
		<>
			<Navbar />
			<Outlet />
			<ToastContainer />
			<Footer />
		</>
	);
};

export default MainLayout;
