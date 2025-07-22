import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaLandmark, FaComment } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

const Navbar = () => {
	const { user } = useSelector((state) => state.auth);
	const menuRef = useRef(null);

	const dispatch = useDispatch();

	const [userMenuOpen, setUserMenuOpen] = useState(false);

	const toggleUserMenu = () => {
		setUserMenuOpen(!userMenuOpen);
	};

	const logoutUser = () => {
		dispatch(logout());
		dispatch(reset());
	};

	const userExists = () => {
		if (user && user !== null) return true;
		return false;
	};

	useEffect(() => {
		function autoMenuClose(e) {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setUserMenuOpen(false);
			}
		}

		document.addEventListener('mousedown', autoMenuClose);
		return () => {
			document.removeEventListener('mousedown', autoMenuClose);
		};
	}, []);

	return (
		<>
			<nav className="bg-gray-600 px-9 py-7 rounded-br-2xl rounded-bl-2xl shadow-md relative h-25  z-50">
				<div className="flex justify-center gap-10 items-center mt-2">
					<Link
						to="/"
						className="text-white font-bold text-xl flex items-center gap-2 hover:text-gray-400"
					>
						<FaHome /> Home
					</Link>
					<Link
						to="/schemes"
						className="text-white font-bold text-xl flex items-center gap-2 hover:text-gray-400"
					>
						<FaLandmark /> Schemes
					</Link>
					<Link
						to="/feedbacks"
						className="text-white font-bold text-xl flex items-center gap-2 hover:text-gray-400"
					>
						<FaComment /> Feedbacks
					</Link>
				</div>

				<div
					ref={menuRef}
					className="absolute top-1/2 right-15 -translate-y-1/2"
				>
					<img
						src="/images/user.png"
						alt="user"
						className="size-14 rounded-full border cursor-pointer"
						onClick={toggleUserMenu}
					/>
					{userMenuOpen && (
						<div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-600 rounded shadow w-40 p-3">
							{userExists() ? (
								<div className="text-white text-lg text-center">
									<h2 className="mb-2 font-semibold border-b border-gray-700">
										{user.username}
									</h2>
									<Link
										to="/details"
										className="mb-2 hover:text-neutral-300 block"
									>
										Details
									</Link>
									<button
										onClick={logoutUser}
										className="text-red-400 hover:text-red-600 "
									>
										Logout
									</button>
								</div>
							) : (
								<div className="text-white text-lg items-center text-center grid">
									<h2 className="mb-2 font-semibold border-b border-gray-700">
										User
									</h2>
									<Link to="/register" className="mb-2 hover:text-neutral-300">
										Register
									</Link>
									<Link to="/login" className="hover:text-neutral-300">
										Login
									</Link>
								</div>
							)}
						</div>
					)}
				</div>
			</nav>
		</>
	);
};

export default Navbar;
