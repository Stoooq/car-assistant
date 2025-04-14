import fs from "fs";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const insertCars = async () => {
	const results = [];

	await new Promise((resolve, reject) => {
		fs.createReadStream("src/2015.csv")
			.pipe(csv())
			.on("data", (data) => results.push(data))
			.on("end", () => resolve(results))
			.on("error", (err) => reject(err));
	});

	for (const car of results) {
		await prisma.carList.create({
			data: {
				year: Number(car.year),
				brand: car.make,
				model: car.model,
			},
		});
	}
};

insertCars();
