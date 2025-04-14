"only server";

import db from "@/lib/db";

export const getCarList = async () => {
	try {
		const carList = await db.carList.findMany();
		return carList;
	} catch {
		return null;
	}
};
