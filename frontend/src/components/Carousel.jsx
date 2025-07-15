import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Carousel = () => {
	const images = [
		{ id: 1, src: '/images/scheme1.jpg', alt: 'Scheme 1' },
		{ id: 2, src: '/images/scheme2.jpg', alt: 'Scheme 2' },
		{ id: 3, src: '/images/scheme3.jpg', alt: 'Scheme 3' },
		{ id: 4, src: '/images/scheme4.jpg', alt: 'Scheme 4' },
		{ id: 5, src: '/images/scheme5.jpg', alt: 'Scheme 5' },
		{ id: 6, src: '/images/scheme6.jpg', alt: 'Scheme 6' },
		{ id: 7, src: '/images/scheme7.jpg', alt: 'Scheme 7' },
		{ id: 8, src: '/images/scheme8.jpg', alt: 'Scheme 8' },
	];

	const [current, setCurrent] = useState(0);

	const prevSlide = () => {
		setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
	};

	const nextSlide = () => {
		setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
	};

	return (
		<div className="bg-white rounded-2xl shadow-lg m-10 p-8 hover:scale-[1.01] section-container text-center">
			<h1 className="text-amber-800 text-3xl mb-4">Gallery</h1>

			<div className="relative w-[60%] m-auto overflow-hidden rounded-2xl shadow-md">
				<div
					className="flex transition-transform duration-500 ease-in-out"
					style={{ transform: `translateX(-${current * 100}%)` }}
				>
					{images.map((image) => (
						<img
							key={image.id}
							src={image.src}
							alt={image.alt}
							className="w-full flex-shrink-0 h-80 object-cover"
						/>
					))}
				</div>

				{/* Arrows */}
				<button
					onClick={prevSlide}
					className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
				>
					<FaArrowLeft />
				</button>
				<button
					onClick={nextSlide}
					className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
				>
					<FaArrowRight />
				</button>
			</div>
		</div>
	);
};

export default Carousel;
