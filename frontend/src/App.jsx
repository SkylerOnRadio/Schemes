import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import SchemePage from './pages/SchemePage';

function App() {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/schemes" element={<SchemePage />} />
			</Route>
		)
	);

	return <RouterProvider router={router} />;
}
export default App;
