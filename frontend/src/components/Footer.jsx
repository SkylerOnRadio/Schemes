const Footer = () => {
	return (
		<div className="footer text-white bg-[#1c1c1c] pt-10 pb-5 px-6 mt-16 rounded-tl-[2rem] rounded-tr-[2rem] ">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-start ml-30">
				{/* About Us */}
				<div>
					<h5 className="text-lg font-semibold mb-4">About Us</h5>
					<ul className="space-y-2 text-sm">
						<li>
							<a href="#" className="hover:underline">
								Mission & Vision
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Leadership
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Partnerships
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Transparency
							</a>
						</li>
					</ul>
				</div>

				{/* Important Links */}
				<div>
					<h5 className="text-lg font-semibold mb-4">Important Links</h5>
					<ul className="space-y-2 text-sm">
						<li>
							<a href="#" className="hover:underline">
								Govt. of Sikkim
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Central Schemes
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								Downloads
							</a>
						</li>
						<li>
							<a href="#" className="hover:underline">
								FAQs
							</a>
						</li>
					</ul>
				</div>

				{/* Contact */}
				<div>
					<h5 className="text-lg font-semibold mb-4">Contact</h5>
					<ul className="space-y-2 text-sm">
						<li>
							<a href="mailto:support@govaid.in" className="hover:underline">
								support@govaid.in
							</a>
						</li>
						<li>
							<a href="tel:+919876543210" className="hover:underline">
								+91-9876543210
							</a>
						</li>
						<li>Address: Gangtok, Sikkim</li>
					</ul>
				</div>
			</div>

			<hr className="my-6 border-gray-600" />

			<p className="text-center text-sm text-gray-400">
				&copy; 2025 GovAid. All rights reserved.
			</p>
		</div>
	);
};

export default Footer;
