import {
	FaBolt,
	FaBriefcase,
	FaCoins,
	FaFlask,
	FaGraduationCap,
	FaSeedling,
	FaTractor,
	FaUmbrellaBeach,
} from 'react-icons/fa';
import Carousel from '../components/Carousel';

const HomePage = () => {
	return (
		<>
			<div className="bg-white rounded-2xl shadow-[0 4px 12px] m-10 p-8 hover:scale-[1.01]">
				<h1
					className="text-2xl text-amber-800 leading-2 text-justify"
					id="vision"
				>
					Vision of GovAid
				</h1>
				<p className="text-justify leading-6 mt-5">
					At GovAid, our vision is to empower the people of Sikkim with seamless
					access to government schemes across all sectors. We aim to bridge the
					gap between citizens and essential opportunities by providing timely,
					transparent, and comprehensive updates. Our mission is to make crucial
					information readily available, ensuring that no one misses out on the
					benefits designed to improve their lives. Whether it's education,
					healthcare, agriculture, entrepreneurship, or social welfare, GovAid
					ensures that every resident stays informed, engaged, and ready to
					benefit from the resources meant for their growth and well-being.
				</p>
			</div>

			<Carousel />

			<div className="section-container text-center">
				<h1 className="text-amber-800 text-3xl font-semibold">
					Our Ministry Partners
				</h1>

				<div className="flex flex-wrap justify-center gap-10 mt-7">
					{[
						{
							href: 'https://sikkimpower.co.in/',
							icon: <FaBolt />,
							label: 'Power',
						},
						{
							href: 'https://agri.sikkim.gov.in',
							icon: <FaSeedling />,
							label: 'Agriculture',
						},
						{
							href: 'http://sikkimfred.gov.in/user/home.aspx',
							icon: <FaCoins />,
							label: 'Finance',
						},
						{
							href: 'https://www.sikkim.gov.in/departments/rural-management-development-department',
							icon: <FaTractor />,
							label: 'Rural Dev',
						},
						{
							href: 'https://dstsikkim.gov.in/',
							icon: <FaFlask />,
							label: 'Science & Tech',
						},
						{
							href: 'https://www.sikkim.gov.in/departments/education-department',
							icon: <FaGraduationCap />,
							label: 'Education',
						},
						{
							href: 'https://sikkimtourism.gov.in/Public/index',
							icon: <FaUmbrellaBeach />,
							label: 'Tourism',
						},
						{
							href: 'https://labour.sikkim.gov.in/',
							icon: <FaBriefcase />,
							label: 'Labour',
						},
					].map((ministry, index) => (
						<div
							key={index}
							className="flex flex-col items-center justify-center w-32 text-center"
						>
							<a
								href={ministry.href}
								target="_blank"
								rel="noopener noreferrer"
								className="text-5xl text-blue-500 transition duration-300 ease-in-out hover:text-blue-700 transform hover:scale-110"
							>
								{ministry.icon}
							</a>
							<p className="mt-2.5 text-sm font-medium hover:scale-110 transition-transform duration-300">
								{ministry.label}
							</p>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default HomePage;
