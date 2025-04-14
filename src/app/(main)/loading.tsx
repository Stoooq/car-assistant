export default function Loading() {
	return (
		<div className="flex justify-center items-center h-100vh w-full">
			<div className="relative w-[20px] h-[20px] animate-spin">
				<div className="absolute top-0 right-0 w-[5px] h-[5px] bg-blue-500 rounded-full" />
				<div className="absolute top-0 left-0 w-[5px] h-[5px] bg-blue-500 rounded-full" />
				<div className="absolute bottom-0 right-0 w-[5px] h-[5px] bg-blue-500 rounded-full" />
				<div className="absolute bottom-0 left-0 w-[5px] h-[5px] bg-blue-500 rounded-full" />
			</div>
		</div>
	);
}
