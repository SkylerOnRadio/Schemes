import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SchemesPage from './pages/SchemesPage';
import SchemePage from './pages/SchemePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFound from './pages/NotFound';
import DetailsPage from './pages/DetailsPage';
import AddDetailsPage from './pages/AddDetailsPage';
import EditDetailsPage from './pages/EditDetailsPage';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/schemes/:id" element={<SchemePage />} />
				<Route path="/schemes" element={<SchemesPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/user" element={<DetailsPage />} />
				<Route path="/add-details" element={<AddDetailsPage />} />
				<Route path="/edit-details" element={<EditDetailsPage />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}
export default App;
