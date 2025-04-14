"only server";

import db from "@/lib/db";

export const getCarByUserId = async (userId: string) => {
	try {
		const car = await db.car.findFirst({
			where: { userId },
		});
		return car;
	} catch {
		return null;
	}
};

export const getCarByCarId = async (carId: string) => {
	try {
		const car = await db.car.findFirst({
			where: { id: carId },
		});
		return car;
	} catch {
		return null;
	}
};

export const getAllCars = async (userId: string) => {
	try {
		const cars = await db.car.findMany({
			where: { userId },
		});
		return cars;
	} catch {
		return null;
	}
};
