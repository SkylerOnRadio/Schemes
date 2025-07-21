const LoadingBar = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			{/* Loading bar container */}
			<div className="w-64 h-2 bg-gray-200 overflow-hidden rounded relative">
				<div
					className="h-full bg-gray-500 rounded absolute animate-slide"
					style={{ width: '33%' }}
				></div>
			</div>

			<p className="mt-4 text-gray-300 text-lg font-semibold animate-pulse">
				Loading...
			</p>

			{/* Custom animation (Tailwind doesn't have `slide` by default) */}
			<style>
				{`
				@keyframes slide {
					0% { left: -33%; }
					100% { left: 100%; }
				}
				.animate-slide {
					animation: slide 1.5s infinite linear;
				}
				`}
			</style>
		</div>
	);
};

export default LoadingBar;
