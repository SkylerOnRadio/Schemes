import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaLandmark, FaComment, FaTimes, FaBars } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

const Navbar = () => {
	const dispatch = useDispatch();

	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => {
		setMenuOpen(!menuOpen);
	};

	return (
		<>
			<nav className="bg-gray-600 px-9 py-7 rounded-br-2xl rounded-bl-2xl  shadow-md ">
				<div className="flex justify-between items-center ">
					<button
						onClick={toggleMenu}
						className="text-white text-3xl focus:outline-none translate-y-8 translate-x-319 relative "
					>
						{menuOpen ? <FaTimes /> : <FaBars />}
					</button>
				</div>
				<div className="flex gap-10  items-center justify-center">
					<Link
						to="/"
						className="text-white font-bold text-xl px-2 py-4 rounded-xl flex items-center gap-2"
					>
						<FaHome /> Home
					</Link>
					<Link
						to="/schemes"
						className="text-white font-bold text-xl px-2 py-4 rounded-xl flex items-center gap-2"
					>
						<FaLandmark /> Schemes
					</Link>
					<Link
						to="/feedbacks"
						className="text-white font-bold text-xl px-2 py-4 rounded-xl flex items-center gap-2"
					>
						<FaComment /> Feedbacks
					</Link>
				</div>

				{menuOpen && (
					<div className="flex flex-col mt-5 gap-3 md:hidden">
						<Link
							to="/"
							className="text-white font-bold text-lg px-2 py-2 rounded-md flex items-center gap-2"
							onClick={() => setMenuOpen(false)}
						>
							<FaHome /> Home
						</Link>
						<Link
							to="/schemes"
							className="text-white font-bold text-lg px-2 py-2 rounded-md flex items-center gap-2"
							onClick={() => setMenuOpen(false)}
						>
							<FaLandmark /> Schemes
						</Link>
						<Link
							to="/feedbacks"
							className="text-white font-bold text-lg px-2 py-2 rounded-md flex items-center gap-2"
							onClick={() => setMenuOpen(false)}
						>
							<FaComment /> Feedbacks
						</Link>
					</div>
				)}
			</nav>
		</>
	);
};

export default Navbar;
