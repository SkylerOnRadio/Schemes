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
			<ToastContainer position="top-right" autoClose={3000} />
			<Footer />
		</>
	);
};

export default MainLayout;
